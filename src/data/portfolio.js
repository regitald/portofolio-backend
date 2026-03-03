export const developerName = 'Regita Lisgiani Drajat'
export const roleTitle = 'Backend Engineer & Full-Stack Developer'
export const portraitSrc = '/assets/my_picture.png'

export const aboutText = `Backend Engineer and Full-Stack Developer based in Indonesia with around seven years of experience building real-world systems. I specialize in Laravel-based backends, REST/GraphQL APIs, and CMS platforms, while also working with modern frontend stacks using React and Vue. I focus on clean architecture, maintainable code, and scalable system design, and I enjoy collaborating on impactful products.`

export const roles = [
  {
    title: 'Backend Engineer',
    subtitle: 'APIs, databases & CMS',
    description:
      'Designing and building scalable REST and GraphQL APIs, admin panels, and dynamic CMS platforms using Laravel and PHP. Strong focus on clean architecture, validation, performance, and maintainability. Experienced with authentication, payment integrations, and third-party services.',
    tech: 'Laravel, PHP, MySQL, PostgreSQL, Redis, GraphQL',
  },
  {
    title: 'Full-Stack Developer',
    subtitle: 'Web apps & dashboards',
    description:
      'Developing responsive web applications and dashboards using React, Vue, and modern CSS frameworks. Experienced in bridging frontend and backend systems, building reusable components, and maintaining clean project structure for long-term scalability.',
    tech: 'React, Vue.js, Tailwind CSS, Bootstrap, Node.js',
  },
]

// Logos in /public/stack only (exact filenames). Tech tube shows these.
export const stackLogos = [
  { name: 'Bootstrap', logo: 'Bootstrap.svg' },
  { name: 'PostgreSQL', logo: 'Postgresql.svg' },
  { name: 'Node.js', logo: 'nodejs.svg' },
  { name: 'Strapi', logo: 'strapi.svg' },
  { name: 'PHP', logo: 'php.png' },
  { name: 'Laravel', logo: 'laravel.png' },
  { name: 'GraphQL', logo: 'graphql.png' },
  { name: 'React', logo: 'reactjs.png' },
  { name: 'Gitlab', logo: 'gitlab.png' },
  { name: 'GitHub', logo: 'github.png' },
  { name: 'restapi', logo: 'restapi.webp' },
  { name: 'vuejs', logo: 'vuejs.png' },
  { name: 'golang', logo: 'golang.png' },
  { name: 'html', logo: 'html.png' },
  { name: 'expressjs', logo: 'expressjs.png' },
  { name: 'melisearch', logo: 'melisearch.png' },
]
// Full list for other use (fallback to first letter if logo missing)
export const techList = [
  ...stackLogos,
  { name: 'PHP', logo: 'php.svg' },
  { name: 'Laravel', logo: 'laravel.svg' },
  { name: 'GraphQL', logo: 'graphql.svg' },
  { name: 'JavaScript', logo: 'javascript.svg' },
  { name: 'TypeScript', logo: 'typescript.svg' },
  { name: 'React', logo: 'react.svg' },
  { name: 'Vue.js', logo: 'vue.svg' },
  { name: 'Tailwind CSS', logo: 'tailwind.svg' },
  { name: 'Git', logo: 'git.svg' },
  { name: 'GitHub', logo: 'github.svg' },
  { name: 'Docker', logo: 'docker.svg' },
]

export const contactLinks = {
  email: 'regitalisgianidrajat@gmail.com',
  phone: '+62 821-2741-5077 (whatsapp only)',
  github: 'https://github.com/regitald',
  linkedin: 'https://www.linkedin.com/in/regita-lisgiani-774391153',
}

export const projects = [
  {
    id: 'tmi-1',
    title: 'TMI Project',
    desc: 'Cinematic preview',
    preview: '/assets/tmi.mov',
    video: '/assets/tmi.mov',
    link: '#'
  },
  {
    id: 'tmi-2',
    title: 'TMI Project',
    desc: 'Cinematic preview',
    preview: '/assets/tmi.mov',
    video: '/assets/tmi.mov',
    link: '#'
  },
  {
    id: 'tmi-3',
    title: 'TMI Project',
    desc: 'Cinematic preview',
    preview: '/assets/tmi.mov',
    video: '/assets/tmi.mov',
    link: '#'
  }
]
