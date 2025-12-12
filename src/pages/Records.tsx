import { useState, useMemo } from "react";
import styled from "@emotion/styled";
import { useTheme } from "../hooks/useTheme";
import type { Theme } from "../types/theme";
import { mockRecords } from "../features/records/mockData";
import type { MedicalRecord } from "../features/records/types";

// --- Styled Components ---

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
`;

// Header
const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PageTitle = styled.h1<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  font-size: 1.8rem;
`;

const SubTitle = styled.p<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0;
  font-size: 1rem;
`;

// Toolbar / Filter
const Toolbar = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchInput = styled.input<{ theme: Theme }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  min-width: 250px;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const FilterSelect = styled.select<{ theme: Theme }>`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

// Desktop Table Layout
const TableWrapper = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);

  @media (max-width: 768px) {
    display: none; /* Hidden on mobile */
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
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.background}80;
  }
`;

const Td = styled.td<{ theme: Theme }>`
  padding: 1rem 1.5rem;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.95rem;
`;

const PrimaryText = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const SecondaryText = styled.div<{ theme: Theme }>`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

// Mobile Card Layout
const MobileGrid = styled.div`
  display: none;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    display: grid; /* Show on mobile */
  }
`;

const RecordCard = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

// Shared Components
const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;

  ${(props) => {
    switch (props.status) {
      case "Completed":
        return `background-color: #C6F6D5; color: #22543D;`; // Green
      case "Follow-up":
        return `background-color: #FEEBC8; color: #744210;`; // Orange
      case "Pending Results":
        return `background-color: #E2E8F0; color: #2D3748;`; // Gray
      default:
        return `background-color: #E2E8F0; color: #2D3748;`;
    }
  }}
`;

const ViewButton = styled.button<{ theme: Theme }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: transparent;
  color: ${(props) => props.theme.colors.accent};
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
    color: white;
    border-color: ${(props) => props.theme.colors.accent};
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
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ReportCard = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

const ReportHeader = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.accent};
  color: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ReportBody = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionLabel = styled.h4<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.secondary};
  text-transform: uppercase;
  font-size: 0.75rem;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.5px;
`;

const SectionContent = styled.div<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;
  line-height: 1.5;
`;

const MedList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
`;

const CloseFooter = styled.div<{ theme: Theme }>`
  padding: 1rem 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

// --- Main Component ---

const Records = () => {
  const { theme } = useTheme();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(
    null
  );

  // Filter Logic
  const filteredRecords = useMemo(() => {
    return mockRecords.filter((record) => {
      const matchesSearch =
        record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.doctorName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <PageContainer>
      <HeaderSection>
        <PageTitle theme={theme}>Medical Records</PageTitle>
        <SubTitle theme={theme}>
          View your history, prescriptions, and doctor's notes.
        </SubTitle>
      </HeaderSection>

      {/* Toolbar */}
      <Toolbar theme={theme}>
        <SearchInput
          theme={theme}
          placeholder="Search by diagnosis or doctor..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterSelect
          theme={theme}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Pending Results">Pending Results</option>
        </FilterSelect>
      </Toolbar>

      {/* Desktop View: Table */}
      <TableWrapper theme={theme}>
        <Table>
          <thead>
            <tr>
              <Th theme={theme}>Date / Type</Th>
              <Th theme={theme}>Diagnosis</Th>
              <Th theme={theme}>Doctor</Th>
              <Th theme={theme}>Status</Th>
              <Th theme={theme} style={{ textAlign: "right" }}>
                Actions
              </Th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <Tr key={record.id} theme={theme}>
                <Td theme={theme}>
                  <PrimaryText>{record.date}</PrimaryText>
                  <SecondaryText theme={theme}>
                    {record.visitType}
                  </SecondaryText>
                </Td>
                <Td theme={theme}>
                  <strong>{record.diagnosis}</strong>
                </Td>
                <Td theme={theme}>
                  <PrimaryText>{record.doctorName}</PrimaryText>
                  <SecondaryText theme={theme}>
                    {record.department}
                  </SecondaryText>
                </Td>
                <Td theme={theme}>
                  <StatusBadge status={record.status}>
                    {record.status}
                  </StatusBadge>
                </Td>
                <Td theme={theme} style={{ textAlign: "right" }}>
                  <ViewButton
                    theme={theme}
                    onClick={() => setSelectedRecord(record)}
                  >
                    View Report
                  </ViewButton>
                </Td>
              </Tr>
            ))}
            {filteredRecords.length === 0 && (
              <tr>
                <Td
                  theme={theme}
                  colSpan={5}
                  style={{ textAlign: "center", padding: "3rem" }}
                >
                  No records found matching your filters.
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableWrapper>

      {/* Mobile View: Cards */}
      <MobileGrid>
        {filteredRecords.map((record) => (
          <RecordCard key={record.id} theme={theme}>
            <CardHeader>
              <div>
                <StatusBadge status={record.status}>
                  {record.status}
                </StatusBadge>
                <div
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "0.85rem",
                    color: theme.colors.text.secondary,
                  }}
                >
                  {record.date} • {record.visitType}
                </div>
              </div>
            </CardHeader>
            <div>
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  color: theme.colors.text.primary,
                }}
              >
                {record.diagnosis}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9rem",
                  color: theme.colors.text.secondary,
                }}
              >
                {record.doctorName} ({record.department})
              </p>
            </div>
            <ViewButton theme={theme} onClick={() => setSelectedRecord(record)}>
              View Full Report
            </ViewButton>
          </RecordCard>
        ))}
      </MobileGrid>

      {/* Detailed Modal */}
      {selectedRecord && (
        <ModalOverlay onClick={() => setSelectedRecord(null)}>
          <ReportCard theme={theme} onClick={(e) => e.stopPropagation()}>
            <ReportHeader theme={theme}>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
                  Medical Report
                </h2>
                <p style={{ margin: "0.5rem 0 0 0", opacity: 0.9 }}>
                  ID: {selectedRecord.id.toUpperCase()}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700 }}>{selectedRecord.date}</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                  {selectedRecord.visitType}
                </div>
              </div>
            </ReportHeader>

            <ReportBody>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2rem",
                }}
              >
                <div>
                  <SectionLabel theme={theme}>Attending Doctor</SectionLabel>
                  <SectionContent theme={theme}>
                    <strong>{selectedRecord.doctorName}</strong>
                    <br />
                    {selectedRecord.doctorRole}
                    <br />
                    {selectedRecord.department}
                  </SectionContent>
                </div>
                <div>
                  <SectionLabel theme={theme}>Diagnosis</SectionLabel>
                  <SectionContent
                    theme={theme}
                    style={{ fontSize: "1.2rem", fontWeight: 600 }}
                  >
                    {selectedRecord.diagnosis}
                  </SectionContent>
                </div>
              </div>

              <div
                style={{
                  borderTop: `1px solid ${theme.colors.border}`,
                  paddingTop: "1.5rem",
                }}
              >
                <SectionLabel theme={theme}>Clinical Notes</SectionLabel>
                <SectionContent theme={theme}>
                  {selectedRecord.notes}
                </SectionContent>
              </div>

              {selectedRecord.prescription.length > 0 && (
                <div
                  style={{
                    backgroundColor: `${theme.colors.surface}`,
                    border: `1px solid ${theme.colors.border}`,
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                >
                  <SectionLabel theme={theme}>Prescription</SectionLabel>
                  <SectionContent theme={theme}>
                    <MedList>
                      {selectedRecord.prescription.map((med, idx) => (
                        <li key={idx}>{med}</li>
                      ))}
                    </MedList>
                  </SectionContent>
                </div>
              )}
            </ReportBody>

            <CloseFooter theme={theme}>
              <CloseButton
                theme={theme}
                onClick={() => setSelectedRecord(null)}
              >
                Close Report
              </CloseButton>
            </CloseFooter>
          </ReportCard>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default Records;
