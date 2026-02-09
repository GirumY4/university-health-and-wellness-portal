import { useState, useMemo } from "react";
import styled from "@emotion/styled";
import { useTheme } from "../../../hooks/useTheme";
import type { Theme } from "../../../types/theme";
import { mockArticles } from "../mockData";
import type { Article, Category } from "../types";
import {
  SearchIcon,
  SpaIcon,
  FavoriteIcon,
  RestaurantIcon,
  FitnessCenterIcon,
  SchoolIcon,
  AccessTimeIcon,
  CalendarTodayIcon,
  PersonIcon,
  CloseIcon,
  ArrowForwardIcon,
  LocalHospitalIcon,
  PsychologyIcon,
  BookmarkIcon,
  ShareIcon,
  MenuBookIcon,
  CheckCircleIcon,
} from "../../../icons";
import { Box, Chip, IconButton, Button } from "@mui/material";

// --- Styled Components ---

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
`;

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

// Filter & Search Bar
const Toolbar = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
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

const FilterGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 2px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    order: 3;
    margin-top: 1rem;
  }
`;

const CategoryBadge = styled.div<{ isActive: boolean; theme: Theme }>`
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  border: 2px solid
    ${(props) =>
      props.isActive ? props.theme.colors.accent : props.theme.colors.border};
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.accent : "transparent"};
  color: ${(props) =>
    props.isActive ? "#fff" : props.theme.colors.text.primary};
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => (props.isActive ? "#fff" : props.theme.colors.accent)};
    transform: translateY(-2px);
  }

  svg {
    font-size: 1rem;
  }
`;

// Featured Section
const FeaturedCard = styled.div<{ theme: Theme }>`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.accent} 0%,
    ${(props) => props.theme.colors.primary} 100%
  );
  border-radius: 20px;
  padding: 2.5rem;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

    .featured-arrow {
      transform: translateX(5px);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -20%;
    width: 60%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 1%,
      transparent 20%
    );
  }
`;

const FeaturedTag = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  align-self: flex-start;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 2;
`;

const FeaturedTitle = styled.h3`
  font-size: 2.2rem;
  margin: 0;
  font-weight: 800;
  line-height: 1.2;
  position: relative;
  z-index: 2;
`;

const FeaturedExcerpt = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0;
  line-height: 1.6;
  position: relative;
  z-index: 2;
`;

const ReadMoreText = styled.div<{ theme: Theme }>`
  margin-top: 0.5rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
`;

const Divider = styled.div<{ theme: Theme }>`
  height: 1px;
  background-color: ${(props) => props.theme.colors.border};
  width: 100%;
  margin: 2rem 0;
`;

// Grid Layout
const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ArticleCard = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 16px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    transform: translateY(-6px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);

    .article-arrow {
      transform: translateX(5px);
      opacity: 1;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${(props) => props.theme.colors.accent} 0%,
      ${(props) => props.theme.colors.primary} 100%
    );
    border-radius: 4px 4px 0 0;
  }
`;

const ArticleCategory = styled.div<{ theme: Theme; category: string }>`
  color: ${(props) => props.theme.colors.accent};
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  svg {
    font-size: 1rem;
  }
`;

const ArticleTitle = styled.h4<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  line-height: 1.4;
  font-weight: 700;
  flex: 1;
`;

const ArticleExcerpt = styled.p<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.95rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
`;

const ArticleMeta = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.secondary};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  padding-top: 1rem;
  margin-top: auto;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 0.9rem;
  }
`;

const ReadArrow = styled.div<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.accent};
  opacity: 0.7;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.background};
`;

// Reading Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
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

const ModalContent = styled.div<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.surface};
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 24px;
  padding: 3rem;
  position: relative;
  animation: slideUp 0.3s ease-out;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);

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
  margin-bottom: 2rem;
`;

const ModalTitle = styled.h1<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  flex: 1;
`;

const ModalMeta = styled.div<{ theme: Theme }>`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  flex-wrap: wrap;
`;

const ModalMetaItem = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text.secondary};

  svg {
    color: ${(props) => props.theme.colors.accent};
    font-size: 1.1rem;
  }
`;

const ArticleBody = styled.div<{ theme: Theme }>`
  color: ${(props) => props.theme.colors.text.primary};
  line-height: 1.8;
  font-size: 1.1rem;
  margin-top: 2rem;

  h2 {
    font-size: 1.75rem;
    margin: 2rem 0 1rem 0;
    color: ${(props) => props.theme.colors.text.primary};
  }

  h3 {
    font-size: 1.5rem;
    margin: 1.5rem 0 1rem 0;
    color: ${(props) => props.theme.colors.text.primary};
  }

  p {
    margin-bottom: 1.5rem;
  }

  ul,
  ol {
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  strong {
    color: ${(props) => props.theme.colors.accent};
    font-weight: 600;
  }
`;

const ArticleActions = styled.div<{ theme: Theme }>`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
`;

const NoResults = styled.div<{ theme: Theme }>`
  text-align: center;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  svg {
    font-size: 4rem;
    color: ${(props) => props.theme.colors.text.secondary};
    opacity: 0.5;
  }
`;

const NoResultsTitle = styled.h3<{ theme: Theme }>`
  margin: 0;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.5rem;
  font-weight: 600;
`;

const NoResultsText = styled.p<{ theme: Theme }>`
  margin: 0;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1rem;
  max-width: 400px;
`;

// Category icon mapping
const getCategoryIcon = (category: Category) => {
  switch (category) {
    case "Mental Health":
      return <PsychologyIcon name={undefined} />;
    case "Nutrition":
      return <RestaurantIcon name={undefined} />;
    case "Fitness":
      return <FitnessCenterIcon name={undefined} />;
    case "Campus Life":
      return <SchoolIcon name={undefined} />;
    default:
      return <LocalHospitalIcon name={undefined} />;
  }
};

const Wellness = () => {
  const { theme } = useTheme();

  // State
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  // Categories list
  const categories: Category[] = [
    "All",
    "Mental Health",
    "Nutrition",
    "Fitness",
    "Campus Life",
  ];

  // Filter Logic
  const filteredArticles = useMemo(() => {
    return mockArticles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Separate featured article if we are on "All" view and no search is active
  const featuredArticle =
    activeCategory === "All" && !searchQuery
      ? mockArticles.find((a) => a.isFeatured)
      : null;

  // If featured exists, remove it from the grid list so it doesn't show twice
  const gridArticles = featuredArticle
    ? filteredArticles.filter((a) => a.id !== featuredArticle.id)
    : filteredArticles;

  return (
    <PageContainer>
      <HeaderSection>
        <PageTitle theme={theme}>
          <SpaIcon name={undefined} />
          Wellness & Tips
        </PageTitle>
        <SubTitle theme={theme}>
          Curated health resources, campus news, and daily tips for BiT
          students. Stay healthy, stay informed.
        </SubTitle>
      </HeaderSection>

      {/* Toolbar with Search and Filters */}
      <Toolbar theme={theme}>
        <SearchWrapper theme={theme}>
          <SearchIcon name={undefined} />
          <SearchInput
            theme={theme}
            placeholder="Search articles, tips, or wellness topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search wellness articles"
          />
        </SearchWrapper>

        <FilterGroup>
          {categories.map((cat) => (
            <CategoryBadge
              key={cat}
              theme={theme}
              isActive={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {getCategoryIcon(cat)}
              {cat}
            </CategoryBadge>
          ))}
        </FilterGroup>
      </Toolbar>

      {/* Hero Section (Only shows on main view) */}
      {featuredArticle && (
        <FeaturedCard
          theme={theme}
          onClick={() => setReadingArticle(featuredArticle)}
        >
          <FeaturedTag>
            <FavoriteIcon name={undefined} />
            Featured Today
          </FeaturedTag>
          <FeaturedTitle>{featuredArticle.title}</FeaturedTitle>
          <FeaturedExcerpt>{featuredArticle.excerpt}</FeaturedExcerpt>
          <ReadMoreText theme={theme}>
            Read Full Story
            <ArrowForwardIcon className="featured-arrow" name={undefined} />
          </ReadMoreText>
        </FeaturedCard>
      )}

      {/* Articles Grid */}
      {gridArticles.length > 0 ? (
        <>
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
              <MenuBookIcon sx={{ fontSize: "1rem" }} name={undefined} />
              {gridArticles.length} articles found
            </Box>
            {searchQuery && (
              <Chip
                label={`Search: "${searchQuery}"`}
                size="small"
                color="primary"
                variant="outlined"
                onDelete={() => setSearchQuery("")}
              />
            )}
          </Box>

          <ArticleGrid>
            {gridArticles.map((article) => (
              <ArticleCard
                key={article.id}
                theme={theme}
                onClick={() => setReadingArticle(article)}
              >
                <ArticleCategory theme={theme} category={article.category}>
                  {getCategoryIcon(article.category)}
                  {article.category}
                </ArticleCategory>
                <ArticleTitle theme={theme}>{article.title}</ArticleTitle>
                <ArticleExcerpt theme={theme}>
                  {article.excerpt.substring(0, 120)}...
                </ArticleExcerpt>
                <ArticleMeta theme={theme}>
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <MetaItem>
                      <CalendarTodayIcon name={undefined} />
                      {article.date}
                    </MetaItem>
                    <MetaItem>
                      <AccessTimeIcon name={undefined} />
                      {article.readTime}
                    </MetaItem>
                  </Box>
                  <ReadArrow theme={theme} className="article-arrow">
                    <ArrowForwardIcon name={undefined} />
                  </ReadArrow>
                </ArticleMeta>
              </ArticleCard>
            ))}
          </ArticleGrid>
        </>
      ) : (
        <NoResults theme={theme}>
          <SearchIcon sx={{ fontSize: "4rem" }} name={undefined} />
          <NoResultsTitle theme={theme}>No articles found</NoResultsTitle>
          <NoResultsText theme={theme}>
            {searchQuery
              ? `No articles match "${searchQuery}" in ${
                  activeCategory === "All" ? "all categories" : activeCategory
                }.`
              : `No articles available in ${activeCategory}.`}
          </NoResultsText>
          <Button
            variant="outlined"
            startIcon={<CloseIcon name={undefined} />}
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
          >
            Clear filters
          </Button>
        </NoResults>
      )}

      {/* Reading Mode Modal */}
      {readingArticle && (
        <ModalOverlay onClick={() => setReadingArticle(null)}>
          <ModalContent theme={theme} onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <Box sx={{ flex: 1 }}>
                <ArticleCategory
                  theme={theme}
                  category={readingArticle.category}
                >
                  {getCategoryIcon(readingArticle.category)}
                  {readingArticle.category}
                </ArticleCategory>
                <ModalTitle theme={theme}>{readingArticle.title}</ModalTitle>
              </Box>
              <IconButton
                onClick={() => setReadingArticle(null)}
                sx={{
                  color: theme.colors.text.secondary,
                  "&:hover": {
                    backgroundColor: theme.colors.background,
                  },
                }}
                aria-label="Close article"
              >
                <CloseIcon name={undefined} />
              </IconButton>
            </ModalHeader>

            <ModalMeta theme={theme}>
              <ModalMetaItem theme={theme}>
                <PersonIcon name={undefined} />
                <span>By {readingArticle.author}</span>
              </ModalMetaItem>
              <ModalMetaItem theme={theme}>
                <CalendarTodayIcon name={undefined} />
                <span>{readingArticle.date}</span>
              </ModalMetaItem>
              <ModalMetaItem theme={theme}>
                <AccessTimeIcon name={undefined} />
                <span>{readingArticle.readTime}</span>
              </ModalMetaItem>
            </ModalMeta>

            <ArticleBody theme={theme}>
              <p>
                <strong>Introduction:</strong> {readingArticle.excerpt}
              </p>

              <h2>Key Insights</h2>
              <p>{readingArticle.content}</p>

              <h3>Why This Matters</h3>
              <p>
                Maintaining wellness is crucial for academic success and
                personal growth. The strategies and tips provided in this
                article have been proven effective for students across various
                campuses.
              </p>

              <h3>Practical Tips</h3>
              <ul>
                <li>
                  Incorporate at least 30 minutes of physical activity into your
                  daily routine
                </li>
                <li>Practice mindfulness for 10 minutes each day</li>
                <li>Stay hydrated with at least 8 glasses of water</li>
                <li>Prioritize 7-8 hours of quality sleep</li>
                <li>Take regular study breaks to prevent burnout</li>
              </ul>

              <h3>Campus Resources</h3>
              <p>
                Remember that the BiT Campus Clinic offers free wellness
                consultations, mental health support, and fitness classes. Visit
                the clinic or book an appointment through our portal for
                personalized guidance.
              </p>
            </ArticleBody>

            <ArticleActions theme={theme}>
              <Button
                variant="outlined"
                startIcon={<BookmarkIcon name={undefined} />}
                sx={{ textTransform: "none" }}
              >
                Save for later
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShareIcon name={undefined} />}
                sx={{ textTransform: "none" }}
              >
                Share article
              </Button>
              <Box sx={{ flex: 1 }} />
              <Button
                variant="contained"
                endIcon={<CheckCircleIcon name={undefined} />}
                sx={{
                  textTransform: "none",
                  backgroundColor: theme.colors.accent,
                  "&:hover": {
                    backgroundColor: theme.colors.primary,
                  },
                }}
                onClick={() => setReadingArticle(null)}
              >
                Finished Reading
              </Button>
            </ArticleActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default Wellness;
