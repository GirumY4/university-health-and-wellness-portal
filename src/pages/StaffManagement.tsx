import { useState, useMemo } from "react";
import styled from "@emotion/styled";
import { useTheme } from "../hooks/useTheme";
import { mockClinicUsers } from "../features/admin/mockData";
import type { Theme } from "../types/theme";

// --- Styled Components ---

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PageTitle = styled.h1<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  font-size: 1.8rem;
`;

const Toolbar = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input<{ theme: Theme }>`
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const SelectInput = styled.select<{ theme: Theme }>`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  outline: none;
  cursor: pointer;
`;

const AddButton = styled.button<{ theme: Theme }>`
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }
`;

// Desktop Table
const TableWrapper = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th<{ theme: Theme }>`
  text-align: left;
  padding: 1rem 1.5rem;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
`;

const Tr = styled.tr<{ theme: Theme }>`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.background}80;
  }
`;

const Td = styled.td<{ theme: Theme }>`
  padding: 1rem 1.5rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

// Mobile Card Grid
const MobileGrid = styled.div`
  display: none;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    display: grid;
  }
`;

const UserCard = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const StatusBadge = styled.span<{ isActive: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: ${(props) => (props.isActive ? "#C6F6D5" : "#FED7D7")};
  color: ${(props) => (props.isActive ? "#22543D" : "#9B2C2C")};
`;

const ActionButton = styled.button<{ theme: Theme; variant?: "danger" }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid
    ${(props) =>
      props.variant === "danger" ? "#FC8181" : props.theme.colors.border};
  background-color: transparent;
  color: ${(props) =>
    props.variant === "danger" ? "#E53E3E" : props.theme.colors.text.primary};
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: 500;
  margin-left: 0.5rem;

  &:hover {
    background-color: ${(props) =>
      props.variant === "danger" ? "#FFF5F5" : props.theme.colors.background};
  }
`;

// --- Modal Components ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ModalCard = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2<{ theme: Theme }>`
  margin: 0 0 1.5rem 0;
  color: ${(props) => props.theme.colors.text.primary};
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label<{ theme: Theme }>`
  display: block;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const ModalInput = styled.input<{ theme: Theme }>`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  outline: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const StaffManagement = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter Logic
  const filteredUsers = useMemo(() => {
    return mockClinicUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [searchQuery, roleFilter]);

  const handleDeactivate = (name: string) => {
    if (confirm(`Are you sure you want to deactivate ${name}?`)) {
      // API call logic would go here
      console.log("Deactivated", name);
    }
  };

  return (
    <PageContainer>
      <HeaderSection>
        <PageTitle theme={theme}>Staff Management</PageTitle>
        <AddButton theme={theme} onClick={() => setIsModalOpen(true)}>
          <span>➕</span> Add New Staff
        </AddButton>
      </HeaderSection>

      <Toolbar theme={theme}>
        <SearchInput
          theme={theme}
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SelectInput
          theme={theme}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="staff">Staff (Doctors/Nurses)</option>
          <option value="admin">Administrators</option>
        </SelectInput>
      </Toolbar>

      {/* Desktop View */}
      <TableWrapper theme={theme}>
        <Table>
          <thead>
            <tr>
              <Th theme={theme}>Name</Th>
              <Th theme={theme}>Role & ID</Th>
              <Th theme={theme}>Department</Th>
              <Th theme={theme}>Status</Th>
              <Th theme={theme} style={{ textAlign: "right" }}>
                Actions
              </Th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <Tr key={user.id} theme={theme}>
                <Td theme={theme}>
                  <div style={{ fontWeight: 600 }}>{user.name}</div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: theme.colors.text.secondary,
                    }}
                  >
                    {user.email}
                  </div>
                </Td>
                <Td theme={theme}>
                  <span
                    style={{
                      textTransform: "uppercase",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                    }}
                  >
                    {user.role}
                  </span>
                  <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                    {user.id}
                  </div>
                </Td>
                <Td theme={theme}>{user.department}</Td>
                <Td theme={theme}>
                  <StatusBadge isActive={user.isAccountActive}>
                    {user.isAccountActive ? "Active" : "Inactive"}
                  </StatusBadge>
                </Td>
                <Td theme={theme} style={{ textAlign: "right" }}>
                  <ActionButton theme={theme}>Edit</ActionButton>
                  <ActionButton
                    theme={theme}
                    variant="danger"
                    onClick={() => handleDeactivate(user.name)}
                  >
                    {user.isAccountActive ? "Disable" : "Enable"}
                  </ActionButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      {/* Mobile View */}
      <MobileGrid>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} theme={theme}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <div>
                <h3 style={{ margin: 0, color: theme.colors.text.primary }}>
                  {user.name}
                </h3>
                <p
                  style={{
                    margin: "0.25rem 0",
                    color: theme.colors.text.secondary,
                    fontSize: "0.9rem",
                  }}
                >
                  {user.email}
                </p>
              </div>
              <StatusBadge isActive={user.isAccountActive}>
                {user.isAccountActive ? "Active" : "Inactive"}
              </StatusBadge>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                fontSize: "0.85rem",
                opacity: 0.9,
              }}
            >
              <span>
                Role: <strong>{user.role.toUpperCase()}</strong>
              </span>
              <span>
                Dept: <strong>{user.department}</strong>
              </span>
            </div>
            <div
              style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}
            >
              <button
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: `1px solid ${theme.colors.border}`,
                  background: "transparent",
                  color: theme.colors.text.primary,
                }}
              >
                Edit
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid #FC8181",
                  background: "transparent",
                  color: "#E53E3E",
                }}
                onClick={() => handleDeactivate(user.name)}
              >
                Disable
              </button>
            </div>
          </UserCard>
        ))}
      </MobileGrid>

      {/* Add User Modal */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalCard theme={theme}>
            <ModalTitle theme={theme}>Add New Staff Member</ModalTitle>
            <FormGroup>
              <Label theme={theme}>Full Name</Label>
              <ModalInput
                theme={theme}
                type="text"
                placeholder="e.g. Dr. Almaz"
              />
            </FormGroup>
            <FormGroup>
              <Label theme={theme}>Email Address</Label>
              <ModalInput
                theme={theme}
                type="email"
                placeholder="email@bit.edu.et"
              />
            </FormGroup>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <FormGroup>
                <Label theme={theme}>Role</Label>
                <SelectInput theme={theme} style={{ width: "100%" }}>
                  <option>Staff</option>
                  <option>Admin</option>
                </SelectInput>
              </FormGroup>
              <FormGroup>
                <Label theme={theme}>Department</Label>
                <ModalInput
                  theme={theme}
                  type="text"
                  placeholder="e.g. Dental"
                />
              </FormGroup>
            </div>
            <ButtonGroup>
              <button
                style={{
                  flex: 1,
                  padding: "1rem",
                  border: `1px solid ${theme.colors.border}`,
                  background: "transparent",
                  color: theme.colors.text.primary,
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "1rem",
                  border: "none",
                  background: theme.colors.accent,
                  color: "white",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => {
                  alert("User Added!");
                  setIsModalOpen(false);
                }}
              >
                Create Account
              </button>
            </ButtonGroup>
          </ModalCard>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default StaffManagement;
