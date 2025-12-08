# sg-stats-card

Statistics card component for displaying metrics and KPIs.

## Features

- Color variants (primary, success, warning, error, info, purple, cyan)
- Main value with unit
- Description with status indicator
- Watermark icon background
- Trend indicator (up/down)
- Additional stats breakdown
- Loading skeleton
- Staggered animation support
- Dark mode

## Usage

### Basic

```html
<sg-stats-card
  title="Total Users"
  value="1,234"
  description="Active this month"
  icon="users"
  color="primary">
</sg-stats-card>
```

### With Unit and Trend

```html
<sg-stats-card
  title="Revenue"
  value="45,678"
  unit="€"
  trend="+12%"
  trend-positive
  description="vs last month"
  icon="chart"
  color="success">
</sg-stats-card>
```

### With Stats Breakdown

```html
<sg-stats-card
  title="Tasks"
  value="128"
  description="In progress"
  icon="clipboard"
  color="info"
  stats='[
    {"label": "Completed", "value": 89, "color": "success"},
    {"label": "Pending", "value": 39, "color": "warning"}
  ]'>
</sg-stats-card>
```

### Staggered Animation

```html
<sg-stats-card title="Card 1" value="100" animation-delay="0"></sg-stats-card>
<sg-stats-card title="Card 2" value="200" animation-delay="100"></sg-stats-card>
<sg-stats-card title="Card 3" value="300" animation-delay="200"></sg-stats-card>
```

### Loading State

```html
<sg-stats-card loading></sg-stats-card>
```

## CSS Custom Properties

| Property | Description | Default |
|----------|-------------|---------|
| `--sg-stats-card-bg` | Background color | `#ffffff` |
| `--sg-stats-card-border` | Border color | `#e5e7eb` |
| `--sg-stats-card-radius` | Border radius | `0.75rem` |
| `--sg-stats-card-accent` | Accent color | `#6366f1` |

<!-- Auto Generated Below -->
