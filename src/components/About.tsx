
import { Shield, Users, Award, Clock } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Fiabilité',
    description: 'Des solutions éprouvées et conformes aux normes pour une sécurité sans compromis.'
  },
  {
    icon: Clock,
    title: 'Réactivité',
    description: 'Interventions rapides et un service client toujours à votre écoute pour une tranquillité d\'esprit assurée.'
  },
  {
    icon: Award,
    title: 'Expertise',
    description: 'Nos techniciens qualifiés et formateurs certifiés vous garantissent un service de pointe.'
  },
  {
    icon: Users,
    title: 'Transparence',
    description: 'Une communication claire et des devis détaillés pour une relation de confiance durable.'
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold text-primary mb-6">Votre partenaire de confiance en sécurité incendie</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <strong>BESI</strong>, c'est l'assurance d'une expertise reconnue en sécurité incendie. Notre mission est de protéger vos biens et vos équipes grâce à des solutions fiables, innovantes et parfaitement conformes aux normes en vigueur.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Que vous soyez une PME, un commerce, une copropriété ou un gestionnaire de bâtiments d'habitation, nous vous offrons un accompagnement sur-mesure pour une protection optimale.
            </p>
            <div className="mt-8 pt-6 border-t-2 border-primary-light">
                <p className="text-sm text-gray-500 mb-2">Le gérant</p>
                <p className="font-bold text-xl text-primary">BESI</p>
                <p className="text-md text-gray-600 mt-1">Spécialiste en Installation & Maintenance en Sécurité Incendie</p>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-primary-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-inner">
                    <value.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-primary mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
