import TrustpilotWidget from '@/components/ui/TrustpilotWidget';

// Diego: completar con los IDs de tu cuenta Trustpilot Business
// https://businessapp.b2c.trustpilot.com/ → Integraciones → TrustBox
const TEMPLATE_ID = '';      // ej: "53aa8912dec7e10d38f59f36" (Micro Review Count)
const BUSINESSUNIT_ID = '';  // ej: "64abcdef1234567890abcdef"

export default function D15Testimonials() {
  return (
    <section id="testimonios" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F0EDE8] mb-3">
            Lo que dicen las familias
          </h2>
          <p className="text-[#F0EDE8]/55 text-base">
            Más de 500 viajes organizados. Todos con la misma dedicación.
          </p>
        </div>

        {/* TrustBox carrusel de reseñas */}
        <TrustpilotWidget
          templateId={TEMPLATE_ID}
          businessunitId={BUSINESSUNIT_ID}
          height="240px"
          theme="dark"
          locale="es-AR"
          className="w-full"
        />

        {/* Micro rating en footer de sección */}
        <div className="mt-6 flex justify-center">
          <TrustpilotWidget
            templateId={TEMPLATE_ID}
            businessunitId={BUSINESSUNIT_ID}
            height="24px"
            theme="dark"
            locale="es-AR"
          />
        </div>
      </div>
    </section>
  );
}
