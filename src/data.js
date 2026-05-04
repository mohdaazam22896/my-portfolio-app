export const resume = {
  name: 'Mohd Aazam',
  title: 'Sr. Application Developer',
  contact: {
    location: 'Noida, India',
    phone: '+917531923845',
    email: 'mohdaazam22896@gmail.com',
    linkedin: 'www.linkedin.com/in/mohd-aazam',
  },
  summary: [
    '7+ years of experience within Software Development with successful project deliverables.',
    'Experienced full stack developer, enthusiastic and working on self and organisation growth, with team play and responsibility, having leadership and quick learning qualities — following agile processes like Scrum and Kanban for task management.',
    'Good experience in working on different technologies like ReactJS, Node.JS, MongoDB, Express.JS, Angular.JS and React Native.',
    'Worked in different domains like media ecosystem, Telehealth, telecommunication, finance etc.',
    'Demonstrates the ability to translate customer requirements into high-level and low-level design.',
  ],
  skills: [
    'JavaScript', 'NodeJs', 'ReactJS', 'AngularJS', 'MongoDB',
    'React Native', 'GraphQL', 'ExpressJS', 'TypeScript', 'Redis',
    'Redux', 'JEST', 'RTL', 'Git',
  ],
  education: [
    {
      degree: 'B.Tech (CSE)',
      period: '2014 – 2018',
      institute: 'Raj Kumar Goel Institute of Technology',
      location: 'Ghaziabad, UP, India',
      percentage: '77%',
    },
    {
      degree: 'Higher Secondary',
      period: '2012 – 2014',
      institute: 'SVM Inter College',
      location: 'Saharanpur, UP, India',
      percentage: '88.8%',
    },
    {
      degree: 'High School',
      period: '2011 – 2012',
      institute: 'SVM Inter College',
      location: 'Saharanpur, UP, India',
      percentage: '82.33%',
    },
  ],
  achievements: [
    'Awarded Employee of the Month',
    'Ace Alliance Award',
    'The Collared Diamond Award',
    "You're A Gem Award",
  ],
  experience: [
    {
      role: 'Sr. Application Developer',
      company: 'Telus International',
      location: 'Noida',
      period: '09/2021 – Present',
      current: true,
      projects: [
        {
          name: 'Casa App',
          description:
            'An agent dashboard for legacy apps designed to provide agents with an efficient platform to manage mobility and home solution accounts of customers. The dashboard serves as a centralised hub, allowing agents to access and handle various aspects related to customer accounts.',
          tech: ['JavaScript', 'React.js', 'Redux', 'Apollo GraphQL', 'Node.js', 'Express.js', 'MongoDB'],
          responsibilities: [
            'Maintain consistency in the project by creating common components using React and styled component library.',
            'Developed new feature – Agent threshold, collection for payment arrangement.',
            'Integrate down stream API through NodeJS, GraphQL.',
            'To ensure the reliability and quality of the codebase, wrote robust unit and component test cases using JEST and the RTL library.',
            'Took responsibility for addressing production bugs and actively investigated and resolved issues reported by users in the live environment.',
          ],
        },
      ],
    },
    {
      role: 'Software Engineer',
      company: 'Successive Technologies',
      location: 'Noida',
      period: '07/2018 – 09/2021',
      current: false,
      projects: [
        {
          name: 'Media Ecosystem',
          description:
            'A central platform which manages the onboarding of the user to different applications and for different regions. It acts as a binding platform for multiple applications, including User Management, Client Management, Notification Manager, and potentially others.',
          tech: ['JavaScript', 'React.js', 'Apollo GraphQL', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript'],
          responsibilities: [
            'Manage user through Okta integration.',
            'Integrated third-party tools and components into applications.',
            'Create Micro Services to Manage Notifications and templates into different languages managed by Strapi.',
            'Create a generic package for authentication/authorisation and an isomorphic package for currency conversion.',
            'Developing RESTful APIs using Node/Express. Writing Apollo/GraphQL APIs.',
            'Integrating React Application with Apollo server/client for Dynamic components.',
          ],
        },
        {
          name: 'Lafiya Telehealth',
          description:
            'Lafiya Telehealth is the Uber for healthcare where doctors and patients can connect from different countries.',
          tech: ['JavaScript', 'AngularJS', 'Node.js', 'Express.js', 'MongoDB'],
          responsibilities: [
            'Designed complete architecture of the project.',
            'Create Dashboard for doctor, patient, pharmacy, medical lab, hospitals, HMO.',
            'Integrate third party APIs like Gokada, Google Maps, AI health checker.',
          ],
        },
        {
          name: 'Kladot',
          description:
            'KlaDot is a digital banking platform that offers a diverse range of high-end digital banking features for major migrants working in the US and their friends and family along with their businesses.',
          tech: ['React Native', 'ReactJs', 'Native Base', 'JavaScript', 'React Bootstrap'],
          responsibilities: [
            'Create cross platform app using React Native and successfully deployed to App Store and Play Store using Expo.',
            'Create Dashboard for user to perform transaction operations.',
            'Create screens for Add virtual/physical card, create bank account, move money from wallet to bank account, top-up wallet using Stripe, remittance wallet transfer, transfer via linked account, Request payment through email, transfer from check deposit, transactions history.',
            'API Integration with all screens, Implement VGSShow to view card details (CVV, card no), Bank KYC using WithPersona to verify user identity.',
          ],
        },
      ],
    },
  ],
};
