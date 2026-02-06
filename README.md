# Aesthetic Theme Switcher

A CSS theme switcher that lets users toggle between light, dark, and custom color themes. It mixes design, interactivity, and user preference storage into a practical, self-contained project.

---

## What It Includes

- **Light and dark mode toggle** across six curated themes
- **Custom color input** for fully personalized themes
- **CSS variables** for complete style control across every component
- **Theme preferences saved in localStorage** so they persist across sessions
- **Export / Import** themes as JSON to share with others
- **WCAG accessibility checker** built into the custom theme generator
- **Color harmony suggestions** (complementary, analogous, triadic, split complementary)

The goal: give users control over how the interface looks and make sure their choice doesn't reset every time they come back.

---

## Why I Built This

I was tired of staring at bright white screens late at night while coding. I wanted to understand how theme switching actually worked, and the best way to learn was to build it myself.

What started as fixing my own problem turned into a project that taught me a lot about CSS structure and how to handle user preferences.

---

## How It Works

The switcher uses **CSS custom properties** to control colors across the entire interface. When someone picks a theme, JavaScript updates those variables and stores the choice in `localStorage`.

When they come back later, the theme loads automatically from storage. No flickering back to default. Their choice is remembered.

For the custom color option, users can pick any color from a color picker and the whole theme adjusts to match in real time. The generator also derives secondary colors (hover states, text variations, borders) automatically so every custom palette feels cohesive.

---

## What I Learned

### CSS Variable Manipulation

CSS variables are powerful for theming. Instead of hardcoding colors everywhere, I defined them once and updated them all at once with a single line of JavaScript.

### Event Listeners

Handling button clicks, color picker changes, and tab navigation gave me practice with event listeners and triggering updates based on user interaction.

### UI/UX Color Theory Basics

Picking colors that worked well together and stayed readable in different modes taught me about contrast, accessibility, and visual hierarchy in ways I hadn't thought about before.

### Building Customizable UI Components

This project showed me how to design components that adapt to what users want instead of locking everyone into one look.

---

## Challenges

Getting the color contrast right across all themes was harder than expected. A color that looked perfect in light mode might be completely unreadable in dark mode. I had to test combinations repeatedly and tweak my CSS to make sure text stayed clear no matter which theme was active.

I also had to figure out how to structure my CSS variables so they were flexible enough for custom colors while still keeping the design cohesive.

---

## Tech Stack

- **HTML** / **CSS** / **JavaScript** (vanilla, no frameworks)
- CSS custom properties for theming
- `localStorage` for persistence
- Google Fonts (EB Garamond, JetBrains Mono)

## Run Locally

```bash
# Any static file server works
python -m http.server 8080
# Then open http://localhost:8080
```
