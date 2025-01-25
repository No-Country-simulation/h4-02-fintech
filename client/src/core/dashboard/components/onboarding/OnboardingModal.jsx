import { useState } from "react";
import { Link } from "react-router-dom";
import onboardingModalImage from "../../../../assets/images/onboarding-modal.svg";

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <dialog
        className={`modal ${isOpen ? "modal-open" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="modal-box relative bg-white max-w-md p-6 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="btn btn-sm btn-ghost absolute right-2 top-2 text-black"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <div className="flex justify-center py-6">
            <img
              src={onboardingModalImage}
              alt="Profile completion illustration"
              width="130"
              height="120"
              className="object-cover"
            />
          </div>

          <div className="mb-6 text-xl text-semibold">
            <p className="text-bold text-center text-black">
              {`Para completar el onboarding, Solo ve al menú lateral y selecciona
              la opción "Terminar o editar mi onboarding".`}
            </p>
            <p className="text-bold text-center text-black mt-2">
              {`¡Recuerda que al terminarlo, desbloquearás todas nuestras recomendaciones personalizadas!.`}
            </p>
          </div>

          <div className="space-y-2 mb-2">
            <Link
              to={"/dashboard/onboarding"}
              className="btn btn-primary w-full"
            >
              Completar ahora
            </Link>
            <button
              className="btn btn-outline w-full flex gap-2 items-center justify-center"
              onClick={() => setIsOpen(false)}
            >
              Continuar sin completar
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
