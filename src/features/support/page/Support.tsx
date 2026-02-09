import React, { useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "../../../hooks/useTheme";
import type { Theme } from "../../../types/theme";

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

// Main Layout Grid
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr; /* Stack on smaller screens */
  }
`;

// Contact Card (Right Panel)
const ContactCard = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactItem = styled.div<{ theme: Theme }>`
  padding-bottom: 1rem;
  border-bottom: 1px dashed ${(props) => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const ContactLabel = styled.h4<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.accent};
  font-size: 0.8rem;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  font-weight: 700;
`;

const ContactValue = styled.p<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  font-size: 1rem;
`;

// Ticket Form (Left Panel)
const FormCard = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
`;

const FormTitle = styled.h3<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding-bottom: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label<{ theme: Theme }>`
  display: block;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
  font-size: 0.95rem;
`;

const Input = styled.input<{ theme: Theme }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.accent}20;
  }
`;

const TextArea = styled.textarea<{ theme: Theme }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.accent}20;
  }
`;

const SubmitButton = styled.button<{ theme: Theme; disabled: boolean }>`
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: opacity 0.2s;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const SuccessMessage = styled.div<{ theme: Theme }>`
  background-color: #c6f6d5; /* Light Green */
  color: #22543d; /* Dark Green */
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
  font-weight: 600;
`;

// --- Component ---

const Support = () => {
  const { theme } = useTheme();
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !details) return;

    setIsSubmitting(true);
    // Simulate API submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubject("");
      setDetails("");
      // Hide success message after 4 seconds
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 1500);
  };

  return (
    <PageContainer>
      <HeaderSection>
        <PageTitle theme={theme}>Support & Help Desk</PageTitle>
        <SubTitle theme={theme}>
          Need help with the portal or have a technical issue? Submit a ticket
          or contact us directly.
        </SubTitle>
      </HeaderSection>

      <ContentGrid>
        {/* Left Side: Ticket Submission Form */}
        <FormCard theme={theme}>
          <FormTitle theme={theme}>Submit a Technical Request</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label theme={theme} htmlFor="subject">
                Subject
              </Label>
              <Input
                theme={theme}
                id="subject"
                type="text"
                placeholder="e.g., Cannot view my records"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme} htmlFor="details">
                Details
              </Label>
              <TextArea
                theme={theme}
                id="details"
                placeholder="Describe the issue you are facing..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </FormGroup>

            <SubmitButton
              theme={theme}
              disabled={isSubmitting || !subject || !details}
            >
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
            </SubmitButton>

            {isSubmitted && (
              <SuccessMessage theme={theme}>
                Ticket Submitted! We will contact you shortly.
              </SuccessMessage>
            )}
          </form>
        </FormCard>

        {/* Right Side: Direct Contact Information */}
        <ContactCard theme={theme}>
          <FormTitle
            theme={theme}
            style={{
              borderBottom: "none",
              paddingBottom: 0,
              marginBottom: "0.5rem",
            }}
          >
            Direct Contacts
          </FormTitle>
          <SubTitle theme={theme}>
            For urgent clinic or health-related matters.
          </SubTitle>

          <ContactItem theme={theme}>
            <ContactLabel theme={theme}>
              Clinic Emergency Line (24/7)
            </ContactLabel>
            <ContactValue theme={theme}>+251 58 123 4567</ContactValue>
          </ContactItem>

          <ContactItem theme={theme}>
            <ContactLabel theme={theme}>
              BiT ICT Support (Portal Issues)
            </ContactLabel>
            <ContactValue theme={theme}>+251 58 654 3210</ContactValue>
            <ContactValue theme={theme} style={{ fontSize: "0.9rem" }}>
              ict.support@bit.edu.et
            </ContactValue>
          </ContactItem>

          <ContactItem theme={theme}>
            <ContactLabel theme={theme}>General Clinic Inquiries</ContactLabel>
            <ContactValue theme={theme}>clinic@bit.edu.et</ContactValue>
            <ContactValue theme={theme} style={{ fontSize: "0.9rem" }}>
              Monday - Friday, 8:00 AM - 5:00 PM
            </ContactValue>
          </ContactItem>
        </ContactCard>
      </ContentGrid>
    </PageContainer>
  );
};

export default Support;
