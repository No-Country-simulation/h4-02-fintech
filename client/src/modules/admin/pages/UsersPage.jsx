import { useEffect, useState } from "react";
import { getUsers } from "../services/users";
import { Navbar } from "../../../core/dashboard/components/dashboard/admin/Navbar";

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const handleUsers = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <>
      <Navbar title="Usuarios"/>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Lista de Usuarios</h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Encabezado de la tabla */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>DNI</th>
                <th>Roles</th>
                <th>Proveedor OAuth</th>
                <th>Teléfono</th>
                <th>Dirección</th>
              </tr>
            </thead>
            {/* Cuerpo de la tabla */}
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img
                          src={
                            user.picture ||
                            "https://www.gravatar.com/avatar/default?d=mp" // Imagen por defecto si no hay URL
                          }
                          alt={user.name}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.dni}</td>
                  <td>
                    {user.roles.map((role) => (
                      <span key={role.id} className="badge badge-info mr-1">
                        {role.name}
                      </span>
                    ))}
                  </td>
                  <td>{user.oauthProvider}</td>
                  <td>{user.phone || "N/A"}</td>
                  <td>{user.address || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
