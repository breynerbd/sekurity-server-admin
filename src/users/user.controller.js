import { User } from "./user.model.js";

// ======================================================
// GET ALL USERS (Con paginación y filtro por rol)
// ======================================================
export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const currentUserRole = req.user?.role;

    let whereCondition = {};

    // Si es un ADMIN estándar, ocultamos el acceso a rangos superiores
    if (currentUserRole === "ADMIN") {
      whereCondition = {
        role: "USER",
      };
    }

    const safeLimit = Math.min(parseInt(limit) || 10, 100);

    const { count, rows } = await User.findAndCountAll({
      limit: safeLimit,
      offset: (page - 1) * safeLimit,
      where: whereCondition,
      order: [["createdAt", "DESC"]],
    });

    return res.json({
      success: true,
      users: rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / safeLimit),
        totalRecords: count,
        limit: safeLimit,
      },
    });
  } catch (error) {
    console.error("❌ Error en getUsers:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ======================================================
// GET USER BY ID (Con bloqueo jerárquico)
// ======================================================
export const getUserById = async (req, res) => {
  try {
    const currentUserRole = req.user?.role;
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    // Un ADMIN estándar no puede husmear cuentas administrativas superiores o iguales
    if (currentUserRole === "ADMIN" && (user.role === "ADMIN" || user.role === "MASTER_ADMIN")) {
      return res.status(403).json({ success: false, message: "Acceso no autorizado a este rango de usuario." });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error("❌ Error en getUserById:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ======================================================
// DEACTIVATE USER (Equivalente al borrado lógico seguro)
// ======================================================
export const deactivateUser = async (req, res) => {
  try {
    const currentUserRole = req.user?.role;
    const currentUserId = req.user?.id;
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    // Restricción: No puedes desactivar tu propia cuenta administrativa
    if (user.auth_id === currentUserId || user.id === currentUserId) {
      return res.status(400).json({ success: false, message: "No puedes desactivarte a ti mismo." });
    }

    // Restricciones para el rol ADMIN
    if (currentUserRole === "ADMIN" && (user.role === "ADMIN" || user.role === "MASTER_ADMIN")) {
      return res.status(403).json({ success: false, message: "No tienes permisos para desactivar administradores." });
    }

    // Restricciones para MASTER_ADMIN (evita guerras de privilegios entre superusuarios)
    if (currentUserRole === "MASTER_ADMIN" && user.role === "MASTER_ADMIN") {
      return res.status(403).json({ success: false, message: "No puedes desactivar a otro MASTER_ADMIN." });
    }

    await user.update({ isActive: false });

    return res.json({ success: true, message: "Usuario desactivado correctamente", user });
  } catch (error) {
    console.error("❌ Error en deactivateUser:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};