
import { ShieldCheck, Bell, DoorClosed, Wrench , Wind, AlarmSmoke } from 'lucide-react';

const services = [
  {
    icon: Bell,
    title: 'Installation & maintenance alarme incendie',
    description: "Installation de systèmes d'alarme incendie conformes aux normes. Maintenance régulière, tests de fonctionnement et interventions d'urgence."
  },
  {
    icon: DoorClosed,
    title: 'Maintenance portes coupe-feu',
    description: "Vérification, entretien et maintenance des portes coupe-feu. Contrôles de conformité, lubrification des mécanismes et remise en état."
  },
  {
    icon: Wrench ,
    title: 'Maintenance blocs de secours',
    description: "Maintenance des blocs de secours et éclairage de secours. Tests d'autonomie, vérification des batteries et changement des lampes."
  },
  {
    icon: Wind,
    title: 'Installation système de désenfumage',
    description: "Installation et mise en place de systèmes de désenfumage. Conformité réglementaire et intégration aux systèmes de sécurité incendie."
  },
  {
    icon: AlarmSmoke,
    title: 'Détection incendie',
    description: "Installation et maintenance des systèmes de détection incendie : détecteurs de fumée, détecteurs de chaleur et alarmes."
  },
  {
    icon: ShieldCheck,
    title: 'Audit et conseil en sécurité incendie',
    description: "Évaluation des risques, élaboration de plans de prévention et accompagnement dans la mise en conformité réglementaire."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Nos Services</h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Des solutions complètes pour votre sécurité incendie
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-light text-primary mb-6">
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
