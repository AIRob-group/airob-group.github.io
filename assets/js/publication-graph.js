(() => {
  'use strict';
  const panel = document.querySelector('.publication-network');
  if (!panel) return;
  const svg = panel.querySelector('svg');
  const canvas = panel.querySelector('.publication-network-canvas');
  const legend = panel.querySelector('.publication-network-legend');
  const detail = panel.querySelector('.publication-network-detail');
  const expand = panel.querySelector('.publication-network-expand');
  const ns = 'http://www.w3.org/2000/svg';
  const element = (tag, attributes) => {
    const node = document.createElementNS(ns, tag);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  };
  const tooltip = document.createElement('div');
  tooltip.className = 'publication-network-tooltip';
  tooltip.hidden = true;
  tooltip.setAttribute('aria-hidden', 'true');
  canvas.append(tooltip);
  expand.addEventListener('click', () => {
    const expanded = expand.getAttribute('aria-expanded') !== 'true';
    expand.setAttribute('aria-expanded', String(expanded));
    panel.dataset.expanded = String(expanded);
    expand.textContent = expanded ? 'Collapse graph' : 'Expand graph';
    tooltip.hidden = true;
  });
  fetch(panel.dataset.source)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      const themes = new Map(data.themes.map(theme => [theme.id, theme]));
      const nodes = new Map(data.nodes.map(node => [node.id, node]));
      if (data.nodes.length) {
        const xs = data.nodes.map(node => node.x);
        const ys = data.nodes.map(node => node.y);
        const left = Math.min(...xs) - 45;
        const top = Math.min(...ys) - 45;
        svg.setAttribute('viewBox', `${left} ${top} ${Math.max(...xs) - left + 45} ${Math.max(...ys) - top + 45}`);
      }
      const neighbors = new Map(data.nodes.map(node => [node.id, new Set()]));
      const edgeElements = [];
      const nodeElements = [];
      const buttons = [];
      let hovered = null;
      let focused = null;
      let selectedTheme = 'all';
      const summary = `${data.nodes.length} publications · ${data.links.length} connections. Hover or focus a paper to trace its connections.`;
      let currentSummary = summary;
      const matches = node => selectedTheme === 'all' || node.themes.includes(selectedTheme);
      const edgeLayer = element('g', { 'aria-hidden': 'true' });
      const nodeLayer = element('g', {});
      svg.append(edgeLayer, nodeLayer);
      data.links.forEach(link => {
        const source = nodes.get(link.source);
        const target = nodes.get(link.target);
        neighbors.get(source.id).add(target.id);
        neighbors.get(target.id).add(source.id);
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const cx = (source.x + target.x) / 2 - dy * 0.16;
        const cy = (source.y + target.y) / 2 + dx * 0.16;
        const edge = element('path', {
          d: `M ${source.x} ${source.y} Q ${cx} ${cy} ${target.x} ${target.y}`,
          class: 'publication-network-edge', 'stroke-width': 0.8 + link.weight * 1.4
        });
        edgeLayer.append(edge);
        edgeElements.push({ edge, source, target });
      });
      const highlight = () => {
        const id = hovered || focused;
        const selected = id && nodes.get(id);
        const related = selected && neighbors.get(id);
        nodeElements.forEach(({ anchor, node }) => {
          anchor.classList.toggle('is-dimmed', Boolean(selected && node.id !== id && !related.has(node.id)));
          anchor.classList.toggle('is-active', node.id === id);
          anchor.classList.toggle('is-neighbor', Boolean(selected && related.has(node.id)));
        });
        edgeElements.forEach(({ edge, source, target }) => {
          const connected = source.id === id || target.id === id;
          edge.classList.toggle('is-active', Boolean(selected && connected));
          edge.classList.toggle('is-dimmed', Boolean(selected && !connected));
          // Draw highlighted arcs last so they remain legible over other links.
          if (selected && connected) edgeLayer.append(edge);
        });
        tooltip.hidden = !selected;
        if (!selected) {
          detail.textContent = currentSummary;
          return;
        }
        const themeNames = selected.themes.map(themeId => themes.get(themeId).label).join(' · ');
        const count = [...related].filter(neighbor => matches(nodes.get(neighbor))).length;
        detail.textContent = `${selected.title} (${selected.year}) — ${themeNames}. ${count} visible connections.`;
        tooltip.replaceChildren();
        const title = document.createElement('strong');
        title.textContent = selected.title;
        const meta = document.createElement('span');
        meta.textContent = `${selected.year} · ${count} connections`;
        const tags = document.createElement('span');
        tags.textContent = themeNames;
        tooltip.append(meta, title, tags);
        const anchor = nodeElements.find(item => item.node.id === id).anchor;
        const box = anchor.getBoundingClientRect();
        const frame = canvas.getBoundingClientRect();
        const x = box.left + box.width / 2 - frame.left;
        const y = box.top - frame.top;
        const width = tooltip.offsetWidth;
        const height = tooltip.offsetHeight;
        const right = frame.width - width - 8;
        const bottom = frame.height - height - 8;
        // Keep the title card away from the very connections being inspected.
        const protectedPoints = nodeElements.filter(item => item.node.id === id || related.has(item.node.id)).map(item => {
          const rect = item.anchor.getBoundingClientRect();
          return [rect.left + rect.width / 2 - frame.left, rect.top + rect.height / 2 - frame.top];
        });
        const transform = svg.getScreenCTM();
        edgeElements.filter(item => item.source.id === id || item.target.id === id).forEach(({ edge }) => {
          const length = edge.getTotalLength();
          for (let i = 1; i < 6; i++) {
            const point = edge.getPointAtLength(length * i / 6).matrixTransform(transform);
            protectedPoints.push([point.x - frame.left, point.y - frame.top]);
          }
        });
        const candidates = [[x + 20, y - height - 16], [x - width - 20, y - height - 16],
          [x + 20, y + 25], [x - width - 20, y + 25], [8, 8], [right, 8], [8, bottom], [right, bottom]];
        const ranked = candidates.map(([left, top]) => {
          left = Math.max(8, Math.min(left, right));
          top = Math.max(8, Math.min(top, bottom));
          const covered = protectedPoints.filter(([px, py]) => px > left - 14 && px < left + width + 14 && py > top - 14 && py < top + height + 14).length;
          return { left, top, score: covered * 10000 + Math.hypot(left + width / 2 - x, top + height / 2 - y) };
        }).sort((a, b) => a.score - b.score);
        tooltip.style.left = `${ranked[0].left}px`;
        tooltip.style.top = `${ranked[0].top}px`;
      };
      data.nodes.forEach(node => {
        const theme = themes.get(node.theme);
        const label = `${node.title} (${node.year}) — ${node.themes.map(id => themes.get(id).label).join('; ')}`;
        const radius = 5.8 + Math.sqrt(neighbors.get(node.id).size) * 1.1;
        const anchor = element('a', {
          href: `#${encodeURIComponent(node.id)}`, class: 'publication-network-node', 'aria-label': label,
          style: `--node-color: ${theme.color}`
        });
        // A large transparent target makes small nodes easier to hover or tap.
        anchor.append(element('circle', { cx: node.x, cy: node.y, r: radius + 6, class: 'publication-network-hit' }));
        anchor.append(element('circle', { cx: node.x, cy: node.y, r: radius + 5, class: 'publication-network-halo' }));
        anchor.append(element('circle', { cx: node.x, cy: node.y, r: radius, fill: theme.color, class: 'publication-network-dot' }));
        // Segmented rings communicate additional theme memberships.
        if (node.themes.length > 1) {
          const circumference = 2 * Math.PI * (radius + 3);
          const segment = circumference / node.themes.length;
          node.themes.forEach((themeId, i) => {
            anchor.append(element('circle', {
              cx: node.x, cy: node.y, r: radius + 3, fill: 'none', stroke: themes.get(themeId).color,
              'stroke-width': 1.6, 'stroke-dasharray': `${segment - 2} ${circumference - segment + 2}`,
              'stroke-dashoffset': -i * segment, class: 'publication-network-theme-ring'
            }));
          });
        }
        anchor.addEventListener('mouseenter', () => { hovered = node.id; highlight(); });
        anchor.addEventListener('mouseleave', () => { hovered = null; highlight(); });
        anchor.addEventListener('focus', () => { focused = node.id; highlight(); });
        anchor.addEventListener('blur', () => { focused = null; highlight(); });
        anchor.addEventListener('click', () => {
          const destination = document.getElementById(node.id);
          if (destination) {
            destination.setAttribute('tabindex', '-1');
            destination.focus({ preventScroll: true });
          }
          hovered = null;
          focused = null;
          highlight();
        });
        nodeLayer.append(anchor);
        nodeElements.push({ anchor, node });
      });
      panel.addEventListener('keydown', event => {
        if (event.key === 'Escape') { hovered = null; focused = null; highlight(); }
      });
      const filter = id => {
        selectedTheme = id;
        hovered = null;
        focused = null;
        nodeElements.forEach(({ anchor, node }) => { anchor.style.display = matches(node) ? '' : 'none'; });
        edgeElements.forEach(({ edge, source, target }) => { edge.style.display = matches(source) && matches(target) ? '' : 'none'; });
        buttons.forEach(({ button, themeId }) => button.setAttribute('aria-pressed', String(id === themeId)));
        currentSummary = id === 'all' ? summary : `${data.nodes.filter(matches).length} publications in ${themes.get(id).label}. Hover a paper to trace its connections.`;
        highlight();
      };
      const sortedThemes = data.themes.map(theme => ({
        ...theme,
        count: data.nodes.filter(node => node.themes.includes(theme.id)).length
      })).sort((a, b) => b.count - a.count);
      [{ id: 'all', label: 'All themes', count: data.nodes.length }, ...sortedThemes].forEach(theme => {
        const count = theme.count;
        if (!count) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-pressed', String(theme.id === 'all'));
        if (theme.color) {
          const swatch = document.createElement('span');
          swatch.className = 'publication-network-swatch';
          swatch.style.backgroundColor = theme.color;
          swatch.setAttribute('aria-hidden', 'true');
          button.append(swatch);
        }
        button.append(document.createTextNode(`${theme.label} (${count})`));
        button.addEventListener('click', () => filter(theme.id));
        buttons.push({ button, themeId: theme.id });
        legend.append(button);
      });
      detail.textContent = summary;
      window.addEventListener('resize', () => { if (hovered || focused) highlight(); });
    })
    .catch(error => {
      detail.textContent = 'The network is unavailable. Browse the complete publication list below.';
      expand.hidden = true;
      canvas.hidden = true;
      console.warn('Publication network:', error);
    });
})();
