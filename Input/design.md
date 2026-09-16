# Shiori Design Specification

> **Document:** `design.md`\
> **Product:** Shiori\
> **Purpose:** Define the visual language, UI principles, design tokens,
> components, and screen-level design rules for the Shiori
> reading-management app.

------------------------------------------------------------------------

## 1. Design Concept

### 1.1 Core idea

Shiori is a reading record app built around the metaphor of a **bookmark
(栞)**.

The visual identity should communicate:

-   calmness
-   warmth
-   quiet intelligence
-   the pleasure of reading
-   nostalgia
-   personal memories
-   a sense of collecting books over time

The app should feel less like a database and more like a **personal
reading journal**.

### 1.2 Visual direction

The selected app icon establishes the primary visual direction:

-   warm ivory background
-   muted sage-green book
-   soft coral/pink bookmark
-   cream-colored pages
-   subtle shadows
-   slightly painterly / tactile appearance
-   rounded, friendly geometry
-   restrained use of color
-   premium but approachable atmosphere

The application UI should translate this visual language into a modern
iOS interface without becoming overly decorative.

### 1.3 Design keywords

**Primary keywords**

`Quiet` / `Warm` / `Bookish` / `Natural` / `Elegant` / `Personal`

**Avoid**

`Corporate` / `Cold` / `Overly colorful` / `Gamified` /
`Overly minimalist` / `Childish`

------------------------------------------------------------------------

# 2. Brand Identity

## 2.1 Brand name

**Shiori**

The name refers to a bookmark / 栞.

The bookmark should therefore be a recurring visual motif throughout the
application.

Possible places to use the motif:

-   app icon
-   empty states
-   section dividers
-   book-detail accents
-   reading records
-   subtle decorative illustrations

Do not place bookmark graphics everywhere. The motif should remain
special.

## 2.2 Logo

The primary visual mark is:

**Bookmark outline + small botanical branch**

The logo represents:

-   a bookmark → reading
-   leaves → growth / knowledge
-   a simple line → elegance and continuity

Use the logo primarily in:

-   launch / onboarding
-   empty states
-   about / settings
-   promotional materials

Avoid using the full logo in every navigation header.

------------------------------------------------------------------------

# 3. Color System

The following colors are derived from the selected icon and should form
the foundation of the application.

## 3.1 Primary colors

  Token         Color              Approx. HEX   Usage
  ------------- ------------------ ------------- -------------------------------
  `sage-500`    Muted sage green   `#899B8C`     Primary brand color
  `sage-600`    Deep sage          `#718576`     Pressed states / emphasis
  `sage-100`    Pale sage          `#E6ECE6`     Backgrounds / selected states
  `ivory-50`    Warm ivory         `#FFFDF8`     Main application background
  `ivory-100`   Cream              `#F8F0DF`     Cards / decorative areas
  `coral-400`   Dusty coral        `#E5A395`     Bookmark accent
  `coral-100`   Pale coral         `#F7E2DE`     Secondary accent background
  `ink-900`     Warm charcoal      `#30332F`     Primary text
  `ink-600`     Soft charcoal      `#666A64`     Secondary text
  `ink-400`     Muted gray         `#92958F`     Tertiary text
  `line-200`    Warm gray          `#E7E3DA`     Borders / dividers

These values are intentionally muted. Avoid highly saturated green,
pink, or yellow.

## 3.2 Semantic colors

Semantic colors should remain compatible with the brand palette.

  Semantic   Recommended color   Usage
  ---------- ------------------- ---------------------------------
  Success    `#718576`           Registration completed, saved
  Warning    `#C79B5A`           Incomplete information
  Error      `#C87970`           Validation / destructive errors
  Info       `#7892A3`           Informational messages

Semantic colors should not overpower the sage/coral brand palette.

## 3.3 Color ratio

Recommended visual balance:

-   65% warm ivory / white
-   20% sage
-   10% charcoal / gray
-   5% coral and other accents

Coral should remain an accent rather than a primary UI color.

------------------------------------------------------------------------

# 4. Typography

## 4.1 General principle

Typography should feel editorial and book-like while remaining highly
readable on iPhone.

Use a clean system sans-serif for most UI.

Recommended:

**Primary UI font:** SF Pro / system font

For decorative brand moments, a serif typeface may be used.

Recommended direction:

-   UI: system sans-serif
-   Book title emphasis: serif or system serif where appropriate
-   Brand logo: elegant serif

Do not use decorative serif fonts for buttons, navigation, or dense
data.

## 4.2 Type scale

  Style            Size Weight     Usage
  ------------- ------- ---------- ----------------------------
  Display         32 pt Semibold   Major page titles
  Large Title     28 pt Bold       Screen titles
  Title 1         24 pt Semibold   Book title / major section
  Title 2         20 pt Semibold   Section headers
  Headline        17 pt Semibold   Cards / list headings
  Body            16 pt Regular    Main text
  Body Small      14 pt Regular    Secondary information
  Caption         12 pt Regular    Metadata
  Micro           11 pt Medium     Small labels

Minimum body text should generally remain **14 pt or larger** for
important information.

------------------------------------------------------------------------

# 5. Spacing System

Use an 8-point base grid.

  Token          Value
  ------------ -------
  `space-1`       4 pt
  `space-2`       8 pt
  `space-3`      12 pt
  `space-4`      16 pt
  `space-5`      20 pt
  `space-6`      24 pt
  `space-8`      32 pt
  `space-10`     40 pt
  `space-12`     48 pt

Default horizontal screen padding:

**16--20 pt**

Large editorial sections may use:

**24 pt**

Avoid dense layouts. Shiori should breathe.

------------------------------------------------------------------------

# 6. Corner Radius

Rounded corners should echo the soft shape of the app icon.

  Component              Radius
  -------------------- --------
  Small chip               8 pt
  Button                  12 pt
  Input                   12 pt
  Card                    16 pt
  Book card               16 pt
  Large feature card      20 pt
  Modal / sheet           24 pt

Do not use excessive pill-shaped UI.

Pills are reserved for:

-   tags
-   status indicators
-   filters

------------------------------------------------------------------------

# 7. Shadows

Shiori should use very soft shadows.

Avoid strong black shadows.

Recommended:

-   low opacity
-   large blur
-   small vertical offset

Example:

``` text
shadow-color: #30332F
opacity: 0.08
blur: 12
y: 4
```

Book covers may have slightly stronger shadows than ordinary cards
because they should visually resemble physical books.

------------------------------------------------------------------------

# 8. Surface Design

## 8.1 Main background

Use warm ivory rather than pure white.

Recommended:

`#FFFDF8`

This is important to the Shiori identity.

## 8.2 Cards

Cards should generally use:

`#FFFFFF`

or

`#F8F0DF`

depending on context.

Do not put every piece of content inside a card.

Use cards when grouping information is meaningful.

## 8.3 Borders

Prefer spacing and subtle shadows over heavy borders.

When a border is required:

`#E7E3DA`

1 px.

------------------------------------------------------------------------

# 9. Iconography

Icons should be:

-   simple
-   rounded
-   line-based
-   lightweight
-   visually quiet

Recommended style:

**SF Symbols / iOS-native symbols**

Use filled icons only for selected navigation states where appropriate.

Suggested icons:

  Function    Icon direction
  ----------- ----------------------
  Bookshelf   `books.vertical`
  Search      `magnifyingglass`
  Add         `plus`
  Scan        `barcode.viewfinder`
  Reading     `book`
  Completed   `checkmark`
  Favorite    `heart`
  Rating      `star`
  Memo        `note.text`
  Settings    `gearshape`
  Calendar    `calendar`

Do not mix multiple icon styles.

------------------------------------------------------------------------

# 10. Navigation

Recommended bottom navigation:

1.  **本棚**
2.  **これから**
3.  **追加**
4.  **記録**
5.  **設定**

The central **追加** action may use a slightly stronger visual
treatment.

The navigation should remain simple.

Avoid more than five primary destinations.

------------------------------------------------------------------------

# 11. Home / 本棚

The bookshelf is the most important screen.

## 11.1 Goal

The user should immediately feel:

> 「自分が読んできた本がここにある」

## 11.2 Header

Example:

``` text
本棚

27冊
```

Use a calm title with minimal controls.

Top-right actions:

-   search
-   display mode
-   sort / filter

## 11.3 Display modes

Support two modes:

### Cover mode

A grid of book covers.

Recommended:

-   3 columns on standard iPhone widths
-   12--16 pt gap
-   rounded corners
-   subtle shadow

### List mode

``` text
[cover]  本のタイトル
         著者名
         ★★★★★
         読了 2026/08/08
```

The user's preferred display mode should be remembered.

## 11.4 Default ordering

Default:

**登録順**

Optional sorting:

-   登録順
-   読了日
-   評価
-   タイトル
-   著者

------------------------------------------------------------------------

# 12. Book Registration

Registration should be one of the smoothest experiences in the
application.

## 12.1 Primary CTA

The main action should be:

**本を追加**

Secondary options:

-   バーコードで登録
-   タイトルで検索
-   ISBNで検索

## 12.2 Barcode flow

Recommended flow:

``` text
本を追加
  ↓
バーコードスキャン
  ↓
書籍情報取得
  ↓
表紙・タイトル・著者を確認
  ↓
ステータス選択
  ↓
登録完了
```

The scan experience should be fast and visually clean.

## 12.3 Registration confirmation

After scanning, show a beautiful book confirmation card.

``` text
[Book Cover]

タイトル
著者

これから読む

        登録する
```

Avoid forcing users through unnecessary fields.

------------------------------------------------------------------------

# 13. Book Status

The app should use three primary states:

### これから

Books the user plans to read.

### 読了

Books the user has finished.

### 未分類 / 保留

Optional internal state if needed for implementation.

The UI should not introduce unnecessary status complexity.

------------------------------------------------------------------------

# 14. Book Detail

Book detail is where Shiori should differentiate itself.

Recommended layout:

``` text
[large cover]

タイトル
著者

★★★★★

読了
2026/08/08

────────────

感想

...

────────────

メモ

...

────────────

読書記録

登録日
読了日
```

The book cover should be the visual hero.

## 14.1 Hero area

Use:

-   large centered cover
-   soft shadow
-   title
-   author
-   rating

Avoid excessive metadata above the fold.

------------------------------------------------------------------------

# 15. Rating

Use a 5-point rating.

Stars should be:

-   warm gold / muted coral when selected
-   warm gray when unselected

Avoid overly bright yellow.

Rating should be easy to change.

------------------------------------------------------------------------

# 16. Memo / Impression

The writing experience should feel like a personal notebook.

## 16.1 Impression

Use a larger multiline text area.

Placeholder:

> この本を読んで感じたことを残しましょう。

## 16.2 Memo

Memo should feel lighter and more flexible.

Potential future support:

-   page number
-   quote
-   tags
-   bookmark

Do not overload the initial version.

------------------------------------------------------------------------

# 17. Empty States

Empty states are an important part of the brand.

Do not use generic system illustrations.

Use subtle Shiori-style illustrations:

-   bookmark
-   open book
-   leaf
-   paper
-   handwritten-style decorative elements

Example:

``` text
まだ本がありません

最初の一冊を登録して、
あなたの本棚をつくりましょう。

[本を追加]
```

The illustration should be small and quiet.

------------------------------------------------------------------------

# 18. Loading States

Prefer skeletons over generic spinners for content.

Book loading:

``` text
[cover skeleton]

Title skeleton
Author skeleton
```

Use the same ivory/sage palette.

Avoid bright blue loading indicators.

------------------------------------------------------------------------

# 19. Animation

Animation should feel calm and physical.

Recommended:

-   150--250 ms for standard transitions
-   250--400 ms for larger modal transitions
-   subtle spring animations for adding a book
-   gentle scale/fade when a book is registered

Example:

**Scan → Book appears → Book slides into bookshelf**

This can become a signature Shiori interaction.

Avoid:

-   bouncing UI
-   excessive confetti
-   fast transitions
-   game-like effects

------------------------------------------------------------------------

# 20. Book Registration Success

This should be one of the most satisfying moments.

Recommended:

``` text
        ✓

本棚に追加しました

『○○○○』

[本棚を見る]
```

The newly added book can briefly animate into position.

The animation should communicate:

> 「この本が、あなたの本棚に加わった」

------------------------------------------------------------------------

# 21. Search

Search should support:

-   title
-   author
-   ISBN

Search UI:

``` text
本を検索

🔍 タイトル・著者・ISBN
```

Results should prioritize the book cover.

Example:

``` text
[cover]  本のタイトル
         著者名
```

Avoid overly dense search result rows.

------------------------------------------------------------------------

# 22. Status / Filter UI

Filters should use subtle chips.

Example:

``` text
すべて   これから   読了
```

Selected:

-   pale sage background
-   sage text

Unselected:

-   transparent / ivory
-   gray text

Avoid dark filled chips.

------------------------------------------------------------------------

# 23. Reading Statistics

Statistics should feel like a personal journal rather than a business
dashboard.

Example:

``` text
読書の記録

2026年

27冊
平均評価 ★★★★☆

今月
4冊
```

Charts should use:

-   sage
-   muted coral
-   ivory

Avoid dashboard-style grids filled with many KPIs.

------------------------------------------------------------------------

# 24. Settings

Settings should use native iOS patterns.

Sections:

### アカウント

-   プロフィール
-   同期

### 本棚

-   表示形式
-   並び順

### データ

-   バックアップ
-   データ復元

### アプリ

-   通知
-   利用規約
-   プライバシーポリシー
-   Shioriについて

------------------------------------------------------------------------

# 25. Buttons

## Primary button

Background:

`sage-500`

Text:

white

Radius:

12 pt

Example:

**登録する**

## Secondary button

Background:

`sage-100`

Text:

`sage-600`

Example:

**本棚を見る**

## Destructive button

Use muted coral/red only when necessary.

Example:

**本を削除**

Avoid bright red unless the action is genuinely destructive.

------------------------------------------------------------------------

# 26. Text Input

Inputs should feel like paper rather than a corporate form.

Recommended:

-   warm ivory / white background
-   subtle border
-   12 pt radius
-   generous vertical padding
-   16 pt text

Focus state:

-   sage border
-   very subtle sage glow

------------------------------------------------------------------------

# 27. Book Cover Treatment

Book covers are the visual centerpiece of Shiori.

Rules:

-   preserve original aspect ratio
-   never distort
-   use subtle shadow
-   use 12--16 pt radius
-   maintain consistent spacing

For very dark covers, do not add unnecessary borders.

------------------------------------------------------------------------

# 28. Illustration Style

If illustrations are introduced later, use:

**soft editorial / painterly illustration**

Characteristics:

-   visible but subtle brush texture
-   muted natural colors
-   cream backgrounds
-   soft edges
-   simple compositions
-   botanical motifs
-   books and bookmarks

Avoid:

-   flat corporate illustrations
-   neon gradients
-   3D cartoon characters
-   overly detailed anime-style artwork

The app icon should remain the strongest visual reference.

------------------------------------------------------------------------

# 29. App Icon Usage

The selected icon is the definitive brand reference.

The icon contains:

-   warm ivory rounded background
-   sage-green book
-   cream pages
-   coral bookmark
-   white bookmark/leaf logo
-   soft natural shadows

Do not modify the icon's visual identity for individual screens.

The UI should borrow the palette and mood, not literally reproduce the
icon everywhere.

------------------------------------------------------------------------

# 30. Accessibility

Visual beauty must not compromise usability.

Requirements:

-   support Dynamic Type where possible
-   maintain readable contrast
-   do not communicate status using color alone
-   touch targets should generally be at least 44 × 44 pt
-   important actions should have text labels or accessible labels
-   support VoiceOver
-   do not rely on tiny text for important information

Muted colors are part of the brand, but text must remain sufficiently
contrasted.

------------------------------------------------------------------------

# 31. Responsive Rules

Primary target:

**iPhone**

The design should work across:

-   small iPhones
-   standard iPhones
-   large iPhones

Do not hard-code fixed widths for major layouts.

Book grids should calculate columns from available width.

Recommended:

``` text
Screen width
  ↓
Safe area
  ↓
16–20 pt horizontal padding
  ↓
Flexible content
```

------------------------------------------------------------------------

# 32. Design Do / Don't

## Do

-   use warm ivory backgrounds
-   use muted sage as the main brand color
-   use coral sparingly
-   use soft shadows
-   give book covers visual priority
-   leave generous whitespace
-   use calm animations
-   use subtle botanical/book motifs
-   maintain an editorial feeling
-   keep interactions simple

## Don't

-   use saturated colors
-   use strong gradients
-   use heavy borders
-   use excessive cards
-   overcrowd screens
-   turn the app into a dashboard
-   overuse animations
-   use generic stock illustrations
-   make every screen look identical
-   sacrifice readability for aesthetics

------------------------------------------------------------------------

# 33. Design Tokens Summary

``` text
Brand
  Primary:        #899B8C
  Primary Dark:   #718576
  Primary Light:  #E6ECE6

Background
  Ivory:          #FFFDF8
  Cream:          #F8F0DF

Accent
  Coral:          #E5A395
  Coral Light:    #F7E2DE

Text
  Ink:            #30332F
  Secondary:      #666A64
  Muted:          #92958F

Border
  #E7E3DA

Spacing
  Base: 8pt
  Screen: 16–20pt

Radius
  Button: 12pt
  Card: 16pt
  Large: 20pt
  Sheet: 24pt

Animation
  Standard: 150–250ms
  Large: 250–400ms

Touch target
  Minimum: 44×44pt
```

------------------------------------------------------------------------

# 34. Design Philosophy for Claude Code

When implementing Shiori, treat this document as a **design system**,
not merely a color reference.

Before creating a new component, ask:

1.  Does it fit the calm reading-journal atmosphere?
2.  Does it use the established spacing and radius system?
3.  Is the UI visually quiet enough?
4.  Does the book remain the visual focus?
5.  Is the interaction obvious without being visually noisy?
6.  Is the component reusable?
7.  Does it work with Dynamic Type and accessibility requirements?

When a new design decision is required and this specification does not
explicitly define it, prefer:

**simple → warm → editorial → spacious → native iOS**

over adding visual complexity.

------------------------------------------------------------------------

# 35. Visual North Star

The selected Shiori icon is the **visual North Star** for the entire
application.

The final product should feel like:

> **「本棚を開いたときの、静かで心地よい時間」**

Shiori should not feel like a database.

It should feel like **a personal bookshelf and reading journal that
happens to be an app.**
