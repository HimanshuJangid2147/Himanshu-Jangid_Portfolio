export interface Fact {
  icon: string;
  label: string;
  value: string;
}

export interface Service {
  icon: string;
  title: string;
  desc: string;
}

export const quickFacts: Fact[] = [
  { icon: '🎯', label: 'Focus', value: 'Full Stack Development' },
  { icon: '📍', label: 'Location', value: 'Ajmer, Rajasthan' },
  { icon: '💡', label: 'Experience', value: '1+ Year' },
  { icon: '🚀', label: 'Status', value: 'Available for Projects' }
];

export const services: Service[] = [
  { icon: '🎨', title: 'Responsive UI/UX', desc: 'Mobile-friendly UIs with Tailwind CSS & Bootstrap' },
  { icon: '⚡', title: 'Performance Optimization', desc: 'Optimising database queries and API response times' },
  { icon: '🔐', title: 'Secure Authentication', desc: 'Implementing JWT-based auth and route protection' },
  { icon: '🔧', title: 'API Development', desc: 'Developing and integrating RESTful APIs' }
];
