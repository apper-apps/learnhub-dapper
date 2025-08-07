import { motion } from "framer-motion";

const RoleCheckboxes = ({ selectedRoles, onChange, label = "접근 권한" }) => {
  const roles = [
    { id: "free", label: "무료", color: "text-green-600" },
    { id: "member", label: "멤버", color: "text-blue-600" },
    { id: "master", label: "마스터", color: "text-purple-600" },
    { id: "both", label: "Both", color: "text-orange-600" }
  ];

  const handleRoleChange = (roleId, checked) => {
    if (checked) {
      onChange([...selectedRoles, roleId]);
    } else {
      onChange(selectedRoles.filter(role => role !== roleId));
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-3">
        {roles.map((role) => (
          <motion.label
            key={role.id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-purple-50 transition-all duration-200 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedRoles.includes(role.id)}
              onChange={(e) => handleRoleChange(role.id, e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <span className={`text-sm font-medium ${role.color}`}>
              {role.label}
            </span>
          </motion.label>
        ))}
      </div>
    </div>
  );
};

export default RoleCheckboxes;