// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-people",
          title: "People",
          description: "Meet the AIRobers!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "Publications from the AIRobers.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "Repositories",
          description: "Open-source code from our research.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-join-us",
          title: "Join Us",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/join_us/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-2019-12-01",
          title: '2019 12 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2019-12-01/";
            },},{id: "news-2020-01-01",
          title: '2020 01 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2020-01-01/";
            },},{id: "news-2020-01-15",
          title: '2020 01 15',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2020-01-15/";
            },},{id: "news-2020-12-01",
          title: '2020 12 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2020-12-01/";
            },},{id: "news-2021-02-01",
          title: '2021 02 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2021-02-01/";
            },},{id: "news-2021-02-15",
          title: '2021 02 15',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2021-02-15/";
            },},{id: "news-2021-03-15",
          title: '2021 03 15',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2021-03-15/";
            },},{id: "news-2021-03-30",
          title: '2021 03 30',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2021-03-30/";
            },},{id: "news-2021-08-01",
          title: '2021 08 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2021-08-01/";
            },},{id: "news-2021-08-02",
          title: '2021 08 02',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2021-08-02/";
            },},{id: "news-2021-08-15",
          title: '2021 08 15',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2021-08-15/";
            },},{id: "news-2021-08-31",
          title: '2021 08 31',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2021-08-31/";
            },},{id: "news-2022-01-01",
          title: '2022 01 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2022-01-01/";
            },},{id: "news-2022-06-15",
          title: '2022 06 15',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2022-06-15/";
            },},{id: "news-2022-06-30",
          title: '2022 06 30',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2022-06-30/";
            },},{id: "news-2023-02-01",
          title: '2023 02 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2023-02-01/";
            },},{id: "news-2023-04-01",
          title: '2023 04 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2023-04-01/";
            },},{id: "news-2023-06-01",
          title: '2023 06 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2023-06-01/";
            },},{id: "news-2023-08-01",
          title: '2023 08 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2023-08-01/";
            },},{id: "news-2023-12-01",
          title: '2023 12 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2023-12-01/";
            },},{id: "news-2024-02-01",
          title: '2024 02 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2024-02-01/";
            },},{id: "news-2024-06-08",
          title: '2024 06 08',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2024-06-08/";
            },},{id: "news-2024-06-30",
          title: '2024 06 30',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2024-06-30/";
            },},{id: "news-2024-07-01",
          title: '2024 07 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2024-07-01/";
            },},{id: "news-2025-04-30",
          title: '2025 04 30',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2025-04-30/";
            },},{id: "news-2025-05-01",
          title: '2025 05 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2025-05-01/";
            },},{id: "news-2025-05-30",
          title: '2025 05 30',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2025-05-30/";
            },},{id: "news-2025-06-01",
          title: '2025 06 01',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2025-06-01/";
            },},{id: "news-2025-06-15",
          title: '2025 06 15',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2025-06-15/";
            },},{id: "news-2025-06-30",
          title: '2025 06 30',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2025-06-30/";
            },},{id: "news-2025-11-08",
          title: '2025 11 08',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2025-11-08/";
            },},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-dblp',
        title: 'DBLP',
        section: 'Socials',
        handler: () => {
          window.open("https://dblp.org/pid/43/7175-1.html", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%68%61%6E%67%6D%61 %61%74 %73%66%75 %64%6F%74 %63%61", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=KJbsVl8AAAAJ", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@airob-lab", "_blank");
        },
      },];
