import D15Form from './D15Form';

export default function D15FormSection() {
  return (
    <section id="cotizacion" className="py-20 px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F0EDE8] mb-3">
            ¿Empezamos a planear?
          </h2>
          <p className="text-[#F0EDE8]/55 text-base max-w-md mx-auto">
            Completá el formulario y en menos de 24 horas Diego te escribe por WhatsApp
            con una propuesta a medida.
          </p>
        </div>

        {/* Formulario */}
        <div className="rounded-3xl border border-white/8 bg-white/3 p-6 sm:p-8">
          <D15Form />
        </div>
      </div>
    </section>
  );
}
