# Date-fns: A Comprehensive Guide

## 1. Introduction to date-fns

date-fns is a modern JavaScript date utility library that provides a comprehensive, consistent, and immutable API for manipulating dates:

- It follows functional programming principles with pure functions that don't mutate arguments
- It's modular, allowing for tree-shaking to reduce bundle size
- It's TypeScript-friendly with full type definitions

## 2. Core Concepts and Basic Operations

### Date Creation and Parsing

```javascript
import { parseISO, parse } from 'date-fns'

// Parse from ISO string
const date1 = parseISO('2023-04-15T12:00:00Z')

// Parse from custom format
const date2 = parse('15/04/2023', 'dd/MM/yyyy', new Date())
```

### Date Formatting

```javascript
import { format } from 'date-fns'

const date = new Date(2023, 3, 15) // April 15, 2023
const formatted = format(date, 'MMMM do, yyyy') // 'April 15th, 2023'
```

### Basic Date Operations

```javascript
import { addDays, subMonths, differenceInDays } from 'date-fns'

const today = new Date()
const tomorrow = addDays(today, 1)
const lastMonth = subMonths(today, 1)
const daysDifference = differenceInDays(tomorrow, today) // 1
```

## 3. Intermediate Concepts

### Date Comparisons

```javascript
import { isAfter, isBefore, isEqual, isWithinInterval } from 'date-fns'

const date1 = new Date(2023, 0, 1)
const date2 = new Date(2023, 11, 31)

isAfter(date2, date1) // true
isBefore(date1, date2) // true
isEqual(date1, new Date(2023, 0, 1)) // true
isWithinInterval(new Date(2023, 6, 15), { start: date1, end: date2 }) // true
```

### Working with Date Parts

```javascript
import { getYear, getMonth, setYear, setMonth } from 'date-fns'

const date = new Date(2023, 3, 15)
getYear(date) // 2023
getMonth(date) // 3 (April, zero-based)

const newDate = setYear(date, 2024)
// newDate is a new Date object for April 15, 2024
```

## 4. Advanced Features

### Localization

```javascript
import { format } from 'date-fns'
import { es, fr } from 'date-fns/locale'

const date = new Date(2023, 3, 15)
format(date, 'MMMM do, yyyy', { locale: es }) // 'abril 15º, 2023'
format(date, 'MMMM do, yyyy', { locale: fr }) // 'avril 15e, 2023'
```

### Time Zones (with date-fns-tz)

```javascript
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'

const date = new Date('2023-04-15T12:00:00Z')
const nyTime = utcToZonedTime(date, 'America/New_York')
format(nyTime, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'America/New_York' })
```

### Business Days

```javascript
import { addBusinessDays, isBusinessDay } from 'date-fns'

const today = new Date()
const nextBusinessDay = addBusinessDays(today, 1)
isBusinessDay(new Date(2023, 3, 15)) // true if April 15, 2023 is a business day
```

## 5. Practical Exercises

Create interactive demos that demonstrate key date-fns concepts, such as:
- Date manipulation (adding/subtracting time periods)
- Date formatting with different locale options
- Date comparison and validation
- Business day calculations
- Relative time formatting

## 6. Teaching Strategies

### Progressive Learning Path

1. **Start with the basics**: Begin with simple date creation, formatting, and manipulation
2. **Build on fundamentals**: Move to comparisons, calculations, and more complex operations
3. **Introduce advanced topics**: Cover localization, time zones, and specialized functions
4. **Apply to real-world scenarios**: Show how date-fns solves common problems

### Hands-on Exercises

1. **Date calculator**: Build a simple app to add/subtract days from dates
2. **Date formatter**: Create a tool that formats dates in different styles
3. **Date validator**: Build a form with date validation using date-fns
4. **Business day calculator**: Create a tool to calculate business days between dates

### Comparison with Other Libraries

Compare date-fns with other popular date libraries:

- **Moment.js**: Older, more established but heavier and no longer recommended for new projects
- **Luxon**: Modern alternative with a different API style
- **Day.js**: Lightweight alternative with a Moment.js-compatible API
- **Native Date API**: Built-in JavaScript functionality (and its limitations)

## 7. Best Practices and Performance Tips

1. **Import only what you need**: Use tree-shaking to reduce bundle size

```javascript
// Good - only imports what you need
import { format, addDays } from 'date-fns'

// Bad - imports everything
import * as dateFns from 'date-fns'
```

2. **Use FP variants for function composition**:

```javascript
import { addDays, formatWithOptions } from 'date-fns/fp'
import { pipe } from 'date-fns/fp'

const formatDate = pipe(
  addDays(1),
  formatWithOptions({}, 'yyyy-MM-dd')
)

formatDate(new Date()) // '2023-04-16'
```

3. **Understand immutability**: All date-fns functions return new Date objects and don't modify inputs
4. **Consider locale file size**: Only import the locales you need

## 8. Assessment Ideas

1. **Practical projects**: Have students build a calendar app, booking system, or date calculator
2. **Code challenges**: Provide real-world date manipulation problems to solve
3. **Comparative analysis**: Ask students to compare date-fns with other libraries for specific use cases
4. **Documentation exercise**: Have students document a date-fns function with examples
```