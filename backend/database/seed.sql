-- Seed lessons
INSERT INTO lessons (title, description, category, duration, order_index, image_url) VALUES
('CSS Basics', 'Learn the fundamentals of CSS', 'basics', 15, 1, 'https://via.placeholder.com/400x300?text=CSS+Basics'),
('CSS Selectors', 'Master CSS selectors and their usage', 'selectors', 20, 2, 'https://via.placeholder.com/400x300?text=CSS+Selectors'),
('Box Model', 'Understand the CSS box model', 'layout', 25, 3, 'https://via.placeholder.com/400x300?text=Box+Model'),
('Flexbox', 'Learn flexible box layout', 'layout', 30, 4, 'https://via.placeholder.com/400x300?text=Flexbox'),
('Grid Layout', 'Master CSS Grid', 'layout', 35, 5, 'https://via.placeholder.com/400x300?text=Grid+Layout'),
('Responsive Design', 'Create responsive websites', 'advanced', 40, 6, 'https://via.placeholder.com/400x300?text=Responsive+Design');

-- Seed lesson sections for CSS Basics
INSERT INTO lesson_sections (lesson_id, title, content, code_example, order_index) VALUES
(1, 'What is CSS?', 'CSS (Cascading Style Sheets) is used to style and layout web pages. It allows you to apply styles to HTML elements.', 'body { font-family: Arial, sans-serif; }', 1),
(1, 'CSS Syntax', 'CSS consists of selectors and declarations. A declaration includes a property and a value.', 'h1 { color: blue; font-size: 24px; }', 2),
(1, 'Ways to Add CSS', 'There are three ways to add CSS: inline, internal, and external stylesheets.', '<link rel="stylesheet" href="style.css">', 3);

-- Seed lesson sections for CSS Selectors
INSERT INTO lesson_sections (lesson_id, title, content, code_example, order_index) VALUES
(2, 'Element Selectors', 'Element selectors target HTML elements by their tag name.', 'p { color: red; }', 1),
(2, 'Class Selectors', 'Class selectors target elements with a specific class attribute.', '.highlight { background-color: yellow; }', 2),
(2, 'ID Selectors', 'ID selectors target a single element with a specific ID.', '#header { background-color: navy; }', 3),
(2, 'Attribute Selectors', 'Attribute selectors target elements based on their attributes.', 'input[type="text"] { border: 1px solid black; }', 4);

-- Seed quizzes
INSERT INTO quizzes (title, description, difficulty, time_limit) VALUES
('CSS Basics Quiz', 'Test your knowledge of CSS fundamentals', 'beginner', 10),
('Selectors Challenge', 'Master CSS selectors', 'intermediate', 15),
('Advanced CSS', 'Test advanced CSS concepts', 'advanced', 20);

-- Seed quiz questions and choices for CSS Basics Quiz
INSERT INTO quiz_questions (quiz_id, question, order_index) VALUES
(1, 'What does CSS stand for?', 1),
(1, 'Which property is used to change text color?', 2),
(1, 'How do you select an element with id "header"?', 3);

-- Get the IDs of the questions we just inserted
-- Question 1: What does CSS stand for?
INSERT INTO quiz_choices (question_id, text) VALUES
(1, 'Cascading Style Sheets'),
(1, 'Computer Style Sheets'),
(1, 'Colorful Style Sheets'),
(1, 'Creative Style Sheets');

-- Question 2: Which property is used to change text color?
INSERT INTO quiz_choices (question_id, text) VALUES
(2, 'text-color'),
(2, 'color'),
(2, 'font-color'),
(2, 'text-style');

-- Question 3: How do you select an element with id "header"?
INSERT INTO quiz_choices (question_id, text) VALUES
(3, '.header'),
(3, '#header'),
(3, 'header'),
(3, '*header');

-- Update correct choice IDs (assuming they're inserted in order)
UPDATE quiz_questions SET correct_choice_id = 1 WHERE id = 1;
UPDATE quiz_questions SET correct_choice_id = 5 WHERE id = 2;
UPDATE quiz_questions SET correct_choice_id = 7 WHERE id = 3;

-- Seed flashcards
INSERT INTO flashcards (question, answer, category) VALUES
('What is the CSS box model?', 'The CSS box model consists of content, padding, border, and margin.', 'concepts'),
('What is the difference between margin and padding?', 'Margin is the space outside an element, padding is the space inside.', 'concepts'),
('What does the z-index property do?', 'The z-index property specifies the stack order of elements.', 'properties'),
('How do you center a div horizontally?', 'Use margin: 0 auto; or flexbox with justify-content: center;', 'layout'),
('What is the difference between block and inline elements?', 'Block elements take up full width, inline elements only take up necessary width.', 'concepts'),
('How do you make an element responsive?', 'Use media queries, flexible layouts (flexbox/grid), and relative units (%, em, rem).', 'responsive'),
('What is a CSS pseudo-class?', 'A pseudo-class is a keyword added to a selector to specify a special state of an element.', 'selectors'),
('What does the !important rule do?', 'The !important rule gives a CSS property the highest specificity.', 'properties');
