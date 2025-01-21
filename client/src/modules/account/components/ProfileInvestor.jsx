import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/profile";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileValidationSchema } from "../../../core/validators/profile";
import { useAuthStore } from "../../../core/auth/store/useAuthStore";
import { useAuth0 } from "@auth0/auth0-react";

export const ProfileInvestor = () => {
  const { user } = useAuthStore();
  const { user: userAuth0 } = useAuth0();
  const [pictureOptions /* setPictureOptions */] = useState([
    user?.picture || userAuth0?.picture || "",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Riley",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Maria",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Aidan",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Chase",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Easton",
  ]);

  const [selectPicture, setSelectPicture] = useState(user?.picture || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: {
      name: "",
      dni: "",
      phone: "",
      email: "",
      address: "",
      milestoneAchieved: false,
      savingsGoalMet: false,
      investmentOpportunities: false,
      investmentExpirations: false,
      dailyNotifications: false,
      weeklyNotifications: false,
      monthlyNotifications: false,
      picture: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Datos enviados:", data);
      await updateProfile(user.id, data);
      toast.success("Perfil actualizado", {
        description: "El perfil se ha guardado correctamente.",
      });
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      toast.error("Hubo un problema al actualizar el perfil.");
    }
  };

  const onHandleProfile = async () => {
    try {
      if (user?.id == null) return;

      const profile = await getProfile(user.id);

      reset({
        name: profile.name || "",
        dni: profile.dni || "",
        phone: profile.phone || "",
        email: profile.email || "",
        address: profile.address || "",
        milestoneAchieved: profile.milestoneAchieved || false,
        savingsGoalMet: profile.savingsGoalMet || false,
        investmentOpportunities: profile.investmentOpportunities || false,
        investmentExpirations: profile.investmentExpirations || false,
        dailyNotifications: profile.dailyNotifications || false,
        weeklyNotifications: profile.weeklyNotifications || false,
        monthlyNotifications: profile.monthlyNotifications || false,
        picture: profile.picture || "",
      });
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
  };

  useEffect(() => {
    onHandleProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePictureSelect = (picture) => {
    setSelectPicture(picture);
    setValue("picture", picture);
  };

  return (
    <div className="p-4 sm:p-6 max-w-lg mx-auto bg-gray-50">
      {/* Selección de imagen de perfil */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {selectPicture ? (
              <img
                src={selectPicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-semibold text-gray-700">
                {user?.name?.[0]?.toUpperCase() || ""}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {pictureOptions.map((picture, index) => (
            <button
              key={index}
              onClick={() => handlePictureSelect(picture)}
              className={`w-16 h-16 rounded-full overflow-hidden bg-gray-200 focus:ring-2 focus:ring-primary ${
                user?.picture === picture ? "ring-2 ring-primary" : ""
              }`}
            >
              {picture === "" ? (
                <span className="text-3xl font-semibold text-gray-700">
                  {user?.name?.[0]?.toUpperCase() || ""}
                </span>
              ) : (
                <img
                  src={picture}
                  alt={`Option ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Nombre y Apellido</span>
          </label>
          <input
            type="text"
            placeholder="Agustín Capdevila"
            {...register("name")}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">DNI</span>
            </label>
            <input
              type="text"
              placeholder="99999999"
              {...register("dni")}
              className="input input-bordered w-full"
            />
            {errors.dni && (
              <p className="text-red-500 text-sm mt-1">{errors.dni.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Teléfono</span>
            </label>
            <input
              type="tel"
              placeholder="+54XXXXXXXXXX"
              {...register("phone")}
              className="input input-bordered w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Correo electrónico</span>
          </label>
          <input
            type="email"
            placeholder="user@mail.com"
            {...register("email")}
            className="input input-bordered w-full"
            disabled
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Dirección</span>
          </label>
          <input
            type="text"
            placeholder="Miguel Angel Carcano, 1195"
            {...register("address")}
            className="input input-bordered w-full"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Notificaciones */}
        <h2 className="text-lg font-bold mt-6">Notificaciones</h2>
        <div className="mt-8 p-2 space-y-4">
          <p className="text-md mb-4 font-semibold">Progreso de objetivos</p>

          <div className="form-control flex flex-row justify-between items-center mb-4">
            <label className="label">
              <span className="label-text">Alcance de hitos importantes</span>
            </label>
            <input
              type="checkbox"
              {...register("milestoneAchieved")}
              className="toggle toggle-primary"
            />
          </div>

          <div className="form-control flex flex-row justify-between items-center">
            <label className="label">
              <span className="label-text">Superar un ahorro mensual</span>
            </label>
            <input
              type="checkbox"
              {...register("savingsGoalMet")}
              className="toggle toggle-primary"
            />
          </div>

          <p className="text-md mb-4 font-semibold">
            Recomendaciones de inversión
          </p>

          <div className="form-control flex flex-row justify-between items-center mb-4">
            <label className="label">
              <span className="label-text">
                Nuevas oportunidades de inversión
              </span>
            </label>
            <input
              type="checkbox"
              {...register("investmentOpportunities")}
              className="toggle toggle-primary"
            />
          </div>

          <div className="form-control flex flex-row justify-between items-center">
            <label className="label">
              <span className="label-text">Vencimiento de inversiones</span>
            </label>
            <input
              type="checkbox"
              {...register("investmentExpirations")}
              className="toggle toggle-primary"
            />
          </div>

          <p className="text-md mb-4 font-semibold">
            Configuración de frecuencia
          </p>

          <div className="form-control flex flex-row justify-between items-center mb-4">
            <label className="label">
              <span className="label-text">Diarias</span>
            </label>
            <input
              type="checkbox"
              {...register("dailyNotifications")}
              className="toggle toggle-primary"
            />
          </div>

          <div className="form-control flex flex-row justify-between items-center mb-4">
            <label className="label">
              <span className="label-text">Semanales</span>
            </label>
            <input
              type="checkbox"
              {...register("weeklyNotifications")}
              className="toggle toggle-primary"
            />
          </div>

          <div className="form-control flex flex-row justify-between items-center">
            <label className="label">
              <span className="label-text">Mensuales</span>
            </label>
            <input
              type="checkbox"
              {...register("monthlyNotifications")}
              className="toggle toggle-primary"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-neutral w-full mt-4 sm:mt-6">
          Guardar perfil
        </button>
      </form>
    </div>
  );
};
