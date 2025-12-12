import { useState, useMemo } from "react";
import styled from "@emotion/styled";
import { useTheme } from "../hooks/useTheme";
import type { Theme } from "../types/theme";
import { mockDoctors, generateSlots } from "../features/appointments/mockData";
import type { Doctor } from "../features/appointments/types";
import {
  SearchIcon,
  FilterIcon,
  StarIcon,
  WorkIcon,
  TimeIcon,
  LocationIcon,
  PersonIcon,
  CalendarIcon,
  CheckIcon,
  CloseIcon,
  ScheduleIcon,
  MedicalIcon,
  ArrowIcon,
} from "../utils/icons";
import { Box, Chip, Avatar, CircularProgress } from "@mui/material";

// --- Styled Components ---

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
`;

// Header Section
const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PageTitle = styled.h1<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: ${(props) => props.theme.colors.accent};
  }
`;

const SubTitle = styled.p<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
  line-height: 1.5;
  max-width: 600px;
`;

// Filter Bar
const FilterContainer = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 1.25rem;
  }
`;

const SearchWrapper = styled.div<{ theme: Theme }>`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 1rem;
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 1.2rem;
  }
`;

const SearchInput = styled.input<{ theme: Theme }>`
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 3rem;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: ${(props) => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.accent}20;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
  }
`;

const SelectWrapper = styled.div<{ theme: Theme }>`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    right: 1rem;
    color: ${(props) => props.theme.colors.text.secondary};
    pointer-events: none;
  }
`;

const SelectInput = styled.select<{ theme: Theme }>`
  padding: 0.85rem 2.5rem 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  cursor: pointer;
  outline: none;
  font-size: 0.95rem;
  appearance: none;
  min-width: 180px;
  transition: all 0.3s;

  &:focus {
    border-color: ${(props) => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.accent}20;
  }
`;

const FilterChipGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    justify-content: center;
  }
`;

// Doctors Grid
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const DoctorCard = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border-color: ${(props) => props.theme.colors.accent};

    .doctor-avatar {
      transform: scale(1.05);
    }

    .book-button {
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const CardHeader = styled.div<{ theme: Theme }>`
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
`;

const DoctorAvatar = styled.div`
  position: relative;

  .availability-badge {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid white;
  }
`;

const DoctorInfo = styled.div`
  flex: 1;
`;

const Name = styled.h3<{ theme: Theme }>`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
`;

const Specialty = styled.p<{ theme: Theme }>`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.colors.accent};
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Dept = styled.p<{ theme: Theme }>`
  margin: 0 0 0.25rem 0;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardStats = styled.div<{ theme: Theme }>`
  display: flex;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 1rem 1.5rem;
  background-color: ${(props) => `${props.theme.colors.background}30`};
  gap: 1.5rem;
`;

const StatItem = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const StatValue = styled.span<{ theme: Theme }>`
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const CardActions = styled.div`
  padding: 1.5rem;
  margin-top: auto;
`;

const BookButton = styled.button<{ theme: Theme }>`
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.95rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${(props) => props.theme.colors.accent}40;
  }
`;

const AvailabilityTag = styled.div<{ theme: Theme; available: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${(props) =>
    props.available ? "rgba(56, 161, 105, 0.1)" : "rgba(229, 62, 62, 0.1)"};
  color: ${(props) => (props.available ? "#38A169" : "#E53E3E")};
  border: 1px solid ${(props) => (props.available ? "#38A169" : "#E53E3E")};
`;

// --- Modal Components ---

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.3s ease-out;
  backdrop-filter: blur(4px);

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalCard = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  width: 100%;
  max-width: 600px;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ModalTitle = styled.h2<{ theme: Theme }>`
  margin: 0;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CloseButton = styled.button<{ theme: Theme }>`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text.secondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

const DoctorSummary = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const SummaryInfo = styled.div`
  flex: 1;
`;

const SummaryName = styled.h4<{ theme: Theme }>`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.1rem;
`;

const SummarySpecialty = styled.p<{ theme: Theme }>`
  margin: 0;
  color: ${(props) => props.theme.colors.accent};
  font-weight: 600;
  font-size: 0.9rem;
`;

const TimeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TimeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimeTitle = styled.h4<{ theme: Theme }>`
  margin: 0;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
`;

const SlotButton = styled.button<{
  theme: Theme;
  isSelected: boolean;
  isAvailable: boolean;
}>`
  padding: 0.85rem;
  border-radius: 12px;
  border: 2px solid
    ${(props) =>
      props.isSelected
        ? props.theme.colors.accent
        : props.isAvailable
        ? props.theme.colors.border
        : `${props.theme.colors.border}80`};
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.accent
      : props.isAvailable
      ? props.theme.colors.background
      : `${props.theme.colors.surface}80`};
  color: ${(props) =>
    props.isSelected
      ? "#fff"
      : props.isAvailable
      ? props.theme.colors.text.primary
      : props.theme.colors.text.secondary};
  font-weight: 600;
  cursor: ${(props) => (props.isAvailable ? "pointer" : "not-allowed")};
  opacity: ${(props) => (props.isAvailable ? 1 : 0.5)};
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    border-color: ${(props) =>
      props.isAvailable
        ? props.theme.colors.accent
        : props.theme.colors.border};
    transform: ${(props) => (props.isAvailable ? "translateY(-2px)" : "none")};
  }

  .slot-time {
    font-size: 0.9rem;
  }

  .slot-label {
    font-size: 0.7rem;
    opacity: 0.7;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const CancelButton = styled.button<{ theme: Theme }>`
  flex: 1;
  padding: 1rem;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text.primary};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.background};
    border-color: ${(props) => props.theme.colors.text.secondary};
  }
`;

const ConfirmButton = styled.button<{ theme: Theme }>`
  flex: 1;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${(props) => props.theme.colors.accent}40;
  }
`;

const SuccessContent = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(56, 161, 105, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #38a169;

  svg {
    font-size: 2.5rem;
  }
`;

const SuccessTitle = styled.h3<{ theme: Theme }>`
  margin: 0;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.5rem;
  font-weight: 700;
`;

const SuccessMessage = styled.p<{ theme: Theme }>`
  margin: 0;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1rem;
  line-height: 1.5;
`;

const AppointmentDetails = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  margin-top: 1rem;
`;

const DetailItem = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    color: ${(props) => props.theme.colors.accent};
  }
`;

// --- Main Component ---

const Appointments = () => {
  const { theme } = useTheme();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // Derived Data (Filtering)
  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === "All" || doc.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [searchQuery, selectedSpecialty]);

  const specialties = [
    "All",
    ...Array.from(new Set(mockDoctors.map((d) => d.specialty))),
  ];
  const slots = generateSlots();

  const handleBookClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(null);
    setIsBookingSuccess(false);
  };

  const confirmBooking = () => {
    setIsBooking(true);
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      setIsBookingSuccess(true);
    }, 1500);
  };

  const getAvailabilityColor = (available: boolean) => {
    return available ? "#38A169" : "#E53E3E";
  };

  return (
    <PageContainer>
      <HeaderSection>
        <PageTitle theme={theme}>
          <CalendarIcon name={undefined} />
          Book an Appointment
        </PageTitle>
        <SubTitle theme={theme}>
          Select a specialist and schedule your visit at the BiT Campus Clinic.
          Find available doctors, check their schedules, and book your
          appointment in minutes.
        </SubTitle>
      </HeaderSection>

      {/* Filter Bar */}
      <FilterContainer theme={theme}>
        <SearchWrapper theme={theme}>
          <SearchIcon name={undefined} />
          <SearchInput
            theme={theme}
            placeholder="Search by name, specialty, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchWrapper>

        <SelectWrapper theme={theme}>
          <SelectInput
            theme={theme}
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {specialties.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </SelectInput>
          <FilterIcon name={undefined} />
        </SelectWrapper>

        <FilterChipGroup>
          <Chip
            label="Available Today"
            icon={<TimeIcon name={undefined} />}
            size="small"
            color={selectedSpecialty === "All" ? "primary" : "default"}
            onClick={() => setSelectedSpecialty("All")}
          />
          <Chip
            label="General Medicine"
            icon={<MedicalIcon name={undefined} />}
            size="small"
            color={
              selectedSpecialty === "General Medicine" ? "primary" : "default"
            }
            onClick={() => setSelectedSpecialty("General Medicine")}
          />
          <Chip
            label="Dermatology"
            icon={<MedicalIcon name={undefined} />}
            size="small"
            color={selectedSpecialty === "Dermatology" ? "primary" : "default"}
            onClick={() => setSelectedSpecialty("Dermatology")}
          />
        </FilterChipGroup>
      </FilterContainer>

      {/* Doctors Count */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Box
          sx={{
            fontSize: "0.95rem",
            color: theme.colors.text.secondary,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <PersonIcon sx={{ fontSize: "1rem" }} name={undefined} />
          {filteredDoctors.length} doctors available
        </Box>
        <Chip
          label={
            selectedSpecialty === "All" ? "All Specialties" : selectedSpecialty
          }
          size="small"
          color="primary"
          variant="outlined"
        />
      </Box>

      {/* Doctors Grid */}
      <Grid>
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} theme={theme}>
            <AvailabilityTag theme={theme} available={doctor.isAvailableToday}>
              {doctor.isAvailableToday ? "Available Today" : "Booked"}
            </AvailabilityTag>

            <CardHeader theme={theme}>
              <DoctorAvatar>
                <Avatar
                  src={doctor.image}
                  alt={doctor.name}
                  sx={{ width: 70, height: 70 }}
                  className="doctor-avatar"
                />
                <Box
                  className="availability-badge"
                  sx={{
                    backgroundColor: getAvailabilityColor(
                      doctor.isAvailableToday
                    ),
                  }}
                />
              </DoctorAvatar>

              <DoctorInfo>
                <Name theme={theme}>{doctor.name}</Name>
                <Specialty theme={theme}>
                  <MedicalIcon sx={{ fontSize: "1rem" }} name={undefined} />
                  {doctor.specialty}
                </Specialty>
                <Dept theme={theme}>
                  <LocationIcon sx={{ fontSize: "1rem" }} name={undefined} />
                  {doctor.department}
                </Dept>
              </DoctorInfo>
            </CardHeader>

            <CardStats theme={theme}>
              <StatItem theme={theme}>
                <StatValue theme={theme}>
                  <StarIcon
                    sx={{ color: "#F6AD55", fontSize: "1rem" }}
                    name={undefined}
                  />
                  {doctor.rating}
                </StatValue>
                <span>Rating</span>
              </StatItem>
              <StatItem theme={theme}>
                <StatValue theme={theme}>
                  <WorkIcon sx={{ fontSize: "1rem" }} name={undefined} />
                  {doctor.experience}
                </StatValue>
                <span>Experience</span>
              </StatItem>
            </CardStats>

            <CardActions>
              <BookButton
                theme={theme}
                onClick={() => handleBookClick(doctor)}
                className="book-button"
                disabled={!doctor.isAvailableToday}
              >
                <ScheduleIcon name={undefined} />
                {doctor.isAvailableToday ? "Book Appointment" : "Fully Booked"}
                {doctor.isAvailableToday && <ArrowIcon name={undefined} />}
              </BookButton>
            </CardActions>
          </DoctorCard>
        ))}
      </Grid>

      {/* Booking Modal */}
      {selectedDoctor && (
        <ModalOverlay
          onClick={() => !isBookingSuccess && setSelectedDoctor(null)}
        >
          <ModalCard theme={theme} onClick={(e) => e.stopPropagation()}>
            {!isBookingSuccess ? (
              <>
                <ModalHeader>
                  <ModalTitle theme={theme}>
                    <CalendarIcon name={undefined} />
                    Book Appointment
                  </ModalTitle>
                  <CloseButton
                    theme={theme}
                    onClick={() => setSelectedDoctor(null)}
                  >
                    <CloseIcon name={undefined} />
                  </CloseButton>
                </ModalHeader>

                <DoctorSummary theme={theme}>
                  <Avatar
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    sx={{ width: 60, height: 60 }}
                  />
                  <SummaryInfo>
                    <SummaryName theme={theme}>
                      {selectedDoctor.name}
                    </SummaryName>
                    <SummarySpecialty theme={theme}>
                      {selectedDoctor.specialty} • {selectedDoctor.department}
                    </SummarySpecialty>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 0.5,
                      }}
                    >
                      <StarIcon
                        sx={{ fontSize: "0.9rem", color: "#F6AD55" }}
                        name={undefined}
                      />
                      <span
                        style={{
                          fontSize: "0.9rem",
                          color: theme.colors.text.secondary,
                        }}
                      >
                        {selectedDoctor.rating} rating
                      </span>
                    </Box>
                  </SummaryInfo>
                </DoctorSummary>

                <TimeSection>
                  <TimeHeader>
                    <TimeTitle theme={theme}>
                      <TimeIcon name={undefined} />
                      Available Time Slots (Today)
                    </TimeTitle>
                    <Chip
                      label="Free consultation"
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  </TimeHeader>

                  <SlotGrid>
                    {slots.map((slot) => (
                      <SlotButton
                        key={slot.id}
                        theme={theme}
                        isAvailable={slot.isAvailable}
                        isSelected={selectedSlot === slot.id}
                        onClick={() =>
                          slot.isAvailable && setSelectedSlot(slot.id)
                        }
                      >
                        <span className="slot-time">{slot.time}</span>
                        <span className="slot-label">
                          {slot.isAvailable ? "Available" : "Booked"}
                        </span>
                      </SlotButton>
                    ))}
                  </SlotGrid>
                </TimeSection>

                <ButtonGroup>
                  <CancelButton
                    theme={theme}
                    onClick={() => setSelectedDoctor(null)}
                  >
                    <CloseIcon name={undefined} />
                    Cancel
                  </CancelButton>
                  <ConfirmButton
                    theme={theme}
                    disabled={!selectedSlot || isBooking}
                    onClick={confirmBooking}
                  >
                    {isBooking ? (
                      <>
                        <CircularProgress size={20} sx={{ color: "white" }} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckIcon name={undefined} />
                        Confirm Booking
                      </>
                    )}
                  </ConfirmButton>
                </ButtonGroup>
              </>
            ) : (
              <SuccessContent>
                <SuccessIcon>
                  <CheckIcon sx={{ fontSize: "3rem" }} name={undefined} />
                </SuccessIcon>

                <div>
                  <SuccessTitle theme={theme}>
                    Appointment Confirmed!
                  </SuccessTitle>
                  <SuccessMessage theme={theme}>
                    Your appointment has been successfully scheduled.
                  </SuccessMessage>
                </div>

                <AppointmentDetails theme={theme}>
                  <DetailItem theme={theme}>
                    <PersonIcon name={undefined} />
                    <span>
                      <strong>Doctor:</strong> {selectedDoctor.name}
                    </span>
                  </DetailItem>
                  <DetailItem theme={theme}>
                    <MedicalIcon name={undefined} />
                    <span>
                      <strong>Specialty:</strong> {selectedDoctor.specialty}
                    </span>
                  </DetailItem>
                  <DetailItem theme={theme}>
                    <TimeIcon name={undefined} />
                    <span>
                      <strong>Time:</strong>{" "}
                      {selectedSlot
                        ? slots.find((s) => s.id === selectedSlot)?.time
                        : "Not set"}
                    </span>
                  </DetailItem>
                  <DetailItem theme={theme}>
                    <CalendarIcon name={undefined} />
                    <span>
                      <strong>Date:</strong> Today,{" "}
                      {new Date().toLocaleDateString()}
                    </span>
                  </DetailItem>
                </AppointmentDetails>

                <ButtonGroup>
                  <ConfirmButton
                    theme={theme}
                    onClick={() => setSelectedDoctor(null)}
                  >
                    Done
                  </ConfirmButton>
                </ButtonGroup>
              </SuccessContent>
            )}
          </ModalCard>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default Appointments;
