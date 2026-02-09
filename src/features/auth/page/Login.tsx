import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";
import type { Theme } from "../../../types/theme";
import { useAuth } from "../../../hooks/useAuth";

// --- Styled Components ---

const Container = styled.div<{ theme: Theme }>`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.background};
  overflow: hidden;
`;

// Left Side: Branding / Image
const BrandSection = styled.div<{ theme: Theme }>`
  flex: 1;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.accent} 0%,
    ${(props) => props.theme.colors.primary} 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 3rem;
  position: relative;

  @media (max-width: 900px) {
    display: none; /* Hide on mobile/tablet for focus */
  }
`;

const BrandContent = styled.div`
  max-width: 400px;
  text-align: center;
  z-index: 2;
`;

const BrandTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
  line-height: 1.2;
`;

const BrandSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
`;

// Right Side: Form
const FormSection = styled.div<{ theme: Theme }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  padding: 2rem;
  position: relative;
`;

const FormCard = styled.div<{ theme: Theme }>`
  width: 100%;
  max-width: 420px;
  padding: 2rem;
`;

const LogoText = styled.h2<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.accent};
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const FormTitle = styled.h3<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  margin-top: 0;
`;

const FormSubtitle = styled.p<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 2.5rem;
  font-size: 0.95rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label<{ theme: Theme }>`
  display: block;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input<{ theme: Theme }>`
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.accent}20;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary}80;
  }
`;

const ActionButton = styled.button<{ theme: Theme; disabled: boolean }>`
  width: 100%;
  padding: 1rem;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.secondary : props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: opacity 0.2s;
  margin-top: 1rem;

  &:hover {
    opacity: ${(props) => (props.disabled ? 1 : 0.9)};
  }
`;

const ErrorMessage = styled.div<{ theme: Theme }>`
  background-color: #fff5f5;
  color: #c53030;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #feb2b2;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  text-align: center;
`;

const FooterText = styled.p<{ theme: Theme }>`
  margin-top: 2rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.85rem;
  text-align: center;
`;

const LinkText = styled.span<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.accent};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// --- Main Component ---

const Login = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth(); // Now returns User | null

  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      // 1. Capture the returned user object
      const loggedInUser = login(universityId, password);

      if (loggedInUser) {
        // 2. Smart Redirection based on Role
        if (loggedInUser.role === "admin") {
          navigate("/admin/dashboard"); // Redirect Admins here
        } else {
          navigate("/app/dashboard"); // Redirect Students/Staff here
        }
      } else {
        setIsLoading(false);
        setError("Invalid ID or Password. (Try ID: ADM_001 / Pass: adminpass)");
      }
    }, 1000);
  };

  return (
    <Container theme={theme}>
      {/* Left Section: Branding */}
      <BrandSection theme={theme}>
        <BrandContent>
          <BrandTitle>Bahir Dar Institute of Technology</BrandTitle>
          <BrandSubtitle>
            Campus Clinic Management System
            <br />
            Secure Portal for Students & Staff
          </BrandSubtitle>
        </BrandContent>
      </BrandSection>

      {/* Right Section: Form */}
      <FormSection theme={theme}>
        <FormCard theme={theme}>
          <LogoText theme={theme}>BiT Health Portal</LogoText>
          <FormTitle theme={theme}>Welcome Back</FormTitle>
          <FormSubtitle theme={theme}>
            Please enter your University ID and password to access your records.
          </FormSubtitle>

          {error && <ErrorMessage theme={theme}>{error}</ErrorMessage>}

          <form onSubmit={handleLogin}>
            <FormGroup>
              <Label theme={theme} htmlFor="uid">
                University ID / Staff ID
              </Label>
              <Input
                theme={theme}
                id="uid"
                type="text"
                placeholder="e.g. BDU123456"
                value={universityId}
                onChange={(e) => setUniversityId(e.target.value)}
                required
              />
            </FormGroup>
            {/* Password Input Field */}
            <FormGroup>
              <Label theme={theme} htmlFor="password">
                Password
              </Label>
              <Input
                theme={theme}
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <ActionButton theme={theme} disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Sign In to Portal"}
            </ActionButton>
          </form>

          <FooterText theme={theme}>
            Having trouble logging in? <br />
            Contact <LinkText theme={theme}>BiT ICT Support</LinkText> or visit
            the Clinic Reception.
          </FooterText>
        </FormCard>
      </FormSection>
    </Container>
  );
};

export default Login;
