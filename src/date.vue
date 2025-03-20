<template>
    <div style="position: relative">
        <!-- The input field to display the selected date -->
        <div class="input-wrapper">
        <div class="input-container">
            <div class="input-padder">
            <input
                class="input-field"
                type="text"
                v-model="formattedDate"
                placeholder="DD/MM/YYYY"
                @input="formatDate"
                @keydown="handleBackspace"
                maxlength="10"
            />
            <img
                @click="toggleCalendar"
                src='@/assets/images/CalendarIcon.svg'
                alt="calendar icon"
                class="input-icon"
            />
            </div>
        </div>
        </div>

        <div v-if="isCalendarVisible" class="calendar-container">
        <img class="calendar-triangle" src='@/assets/images/ArrowSelectIcon.svg' alt="" />
        <div v-if="isYearVisible" class="calendar">
            <div class="calendar-header">
            <div class="top-part">
                <img
                style="margin-left: 0.59vw"
                src='@/assets/images/LeftChevronIcon.svg'
                alt=""
                @click="changeYearRange(-1)"
                />
                <span style="cursor: pointer" @click="toggleYear"
                >{{ yearRangeStart }} - {{ yearRangeStart + 11 }}</span
                >
                <img
                style="margin-right: 0.59vw"
                src='@/assets/images/RightChevronIcon.svg'
                alt=""
                @click="changeYearRange(1)"
                />
            </div>
            </div>
            <div class="months">
            <span
                v-for="index in displayedYears"
                :key="index"
                :class="{
                selected: index === selectedYear,
                currentmonth: index === presentYear,
                }"
                @click="selectYear(index)"
            >
                {{ index }}
            </span>
            </div>
        </div>
        <div v-else-if="isMonthVisible" class="calendar">
            <div class="calendar-header">
            <div class="top-part">
                <img
                style="margin-left: 0.59vw"
                src='@/assets/images/LeftChevronIcon.svg'
                alt=""
                @click="changeYear(-1)"
                />
                <span style="cursor: pointer" @click="toggleYear">{{ currentYear }}</span>
                <img
                style="margin-right: 0.59vw"
                src='@/assets/images/RightChevronIcon.svg'
                alt=""
                @click="changeYear(1)"
                />
            </div>
            </div>
            <div class="months">
            <span
                v-for="(item, index) in months"
                :key="index"
                :class="{
                selected: index === selectedMonth,
                currentmonth: index === presentMonth,
                }"
                @click="selectMonth(index)"
            >
                {{ item.slice(0, 3) }}
            </span>
            </div>
        </div>
        <div v-else class="calendar">
            <div class="calendar-header">
            <div class="top-part">
                <img
                style="margin-left: 0.59vw"
                src='@/assets/images/LeftChevronIcon.svg'
                alt=""
                @click="changeMonth(-1)"
                />
                <span style="cursor: pointer" @click="toggleMonth"
                >{{ months[currentMonth] }} {{ currentYear }}</span
                >
                <img
                style="margin-right: 0.59vw"
                src='@/assets/images/RightChevronIcon.svg'
                alt=""
                @click="changeMonth(1)"
                />
            </div>
            <div class="days-of-week">
                <span v-for="day in daysOfWeek" :key="day">{{ day }}</span>
            </div>
            </div>

            <!-- Day Buttons -->
            <div class="days">
            <span
                v-for="(item, index) in displayedDays"
                :key="index"
                :class="{
                selected:
                    item.day === selectedDay &&
                    item.month === selectedMonth &&
                    item.year === selectedYear,
                'not-current-month': item.isCurrentMonth !== 0,
                today: isToday(item.day, item.month, item.year),
                }"
                @click="selectDate(item)"
            >
                {{ item.day }}
            </span>
            </div>
            <div @click="resetDate" class="today-button">Today</div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    interface Day {
    day: number
    month: number
    year: number
    isCurrentMonth: number
    }

    // Default values
    const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    ]

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const currentMonth = ref(new Date().getMonth())
    const currentYear = ref(new Date().getFullYear())
    const selectedMonth = ref(new Date().getMonth())
    const selectedYear = ref(new Date().getFullYear())
    const selectedDay = ref(new Date().getDate())
    const presentDay = ref(new Date().getDate())
    const presentMonth = ref(new Date().getMonth())
    const presentYear = ref(new Date().getFullYear())
    const isCalendarVisible = ref(false)
    const isMonthVisible = ref(false)
    const isYearVisible = ref(false)
    const formattedDate = ref('')
    const displayedDays = ref<Day[]>([])
    const displayedYears = ref<number[]>([])

    const startYear = ref(2000)
    const rangeSize = ref(12)
    const yearRangeStart = ref(2024) // Default start range 2024-2035

    const generateYearsRange = () => {
    displayedYears.value = Array.from({ length: rangeSize.value }, (_, i) => yearRangeStart.value + i)
    }

    const changeYearRange = (direction: number) => {
    const newStart = yearRangeStart.value + direction * rangeSize.value
    if (newStart >= startYear.value) {
        yearRangeStart.value = newStart
        generateYearsRange()
    }
    }

    const toggleCalendar = () => {
    isCalendarVisible.value = !isCalendarVisible.value
    if (isCalendarVisible.value) {
        isMonthVisible.value = isYearVisible.value = false
        generateCalendar()
    }
    }

    const toggleMonth = () => {
    isMonthVisible.value = !isMonthVisible.value
    }

    const toggleYear = () => {
    isYearVisible.value = !isYearVisible.value
    if (isYearVisible.value) {
        generateYearsRange()
    }
    }

    const resetDate = () => {
    selectedDay.value = new Date().getDate()
    selectedYear.value = currentYear.value = new Date().getFullYear()
    selectedMonth.value = currentMonth.value = new Date().getMonth()
    formattedDate.value = formattedDate.value = formatToDate(
        selectedDay.value,
        selectedMonth.value + 1,
        selectedYear.value,
    )
    isCalendarVisible.value = false
    }

    const isToday = (day: number, month: number, year: number) => {
    return day === presentDay.value && month === presentMonth.value && year === presentYear.value
    }

    const generateCalendar = () => {
    const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
    const totalDays = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
    const lastDayPrevMonth = new Date(currentYear.value, currentMonth.value, 0).getDate()

    const days: { day: number; month: number; year: number; isCurrentMonth: number }[] = []

    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({
        day: lastDayPrevMonth - i,
        month: currentMonth.value - 1 < 0 ? 11 : currentMonth.value - 1,
        year: currentMonth.value - 1 < 0 ? currentYear.value - 1 : currentYear.value,
        isCurrentMonth: -1,
        })
    }

    for (let i = 1; i <= totalDays; i++) {
        days.push({
        day: i,
        month: currentMonth.value,
        year: currentYear.value,
        isCurrentMonth: 0,
        })
    }

    const remainingSlots = 42 - days.length
    for (let i = 1; i <= remainingSlots; i++) {
        days.push({
        day: i,
        month: currentMonth.value + 1 > 11 ? 0 : currentMonth.value + 1,
        year: currentMonth.value + 1 > 11 ? currentYear.value + 1 : currentYear.value,
        isCurrentMonth: 1,
        })
    }

    displayedDays.value = days
    }

    const handleBackspace = (event: KeyboardEvent) => {
    if (event.key === 'Backspace') {
        formattedDate.value = ''
        selectedDay.value = new Date().getDate()
        selectedMonth.value = new Date().getMonth()
        selectedYear.value = new Date().getFullYear()
        return
    }
    }

    const formatDate = (event: Event) => {
    const input = event.target as HTMLInputElement
    let value = input.value.replace(/\D/g, '')

    if (value.length >= 2) {
        let day = value.slice(0, 2)
        if (parseInt(day) > 31) {
        day = '31'
        }
        value = day + '/' + value.slice(2)
    }

    if (value.length >= 5) {
        let month = value.slice(3, 5)
        if (parseInt(month) > 12) {
        month = '12'
        }
        value = value.slice(0, 3) + month + '/' + value.slice(5)
    }

    if (value.length >= 10) {
        let year = value.slice(6, 10)
        if (parseInt(year) < 2000) year = '2000'

        value = value.slice(0, 6) + year
    }

    formattedDate.value = value.slice(0, 10)

    if (value.length === 10) {
        selectedDay.value = parseInt(value.slice(0, 2))
        currentMonth.value = selectedMonth.value = parseInt(value.slice(3, 5)) - 1
        currentYear.value = selectedYear.value = parseInt(value.slice(6, 10))

        generateCalendar()
    }
    }

    const selectDate = (day: Day) => {
    if (day !== null) {
        if (day.isCurrentMonth === -1) {
        changeMonth(-1)
        } else if (day.isCurrentMonth === 1) {
        changeMonth(1)
        }

        selectedDay.value = day.day
        selectedMonth.value = day.month
        selectedYear.value = day.year
        formattedDate.value = formatToDate(
        selectedDay.value,
        selectedMonth.value + 1,
        selectedYear.value,
        )
        isCalendarVisible.value = false
    }
    }

    const selectMonth = (month: number) => {
    currentMonth.value = month
    isMonthVisible.value = !isMonthVisible.value
    generateCalendar()
    }

    const selectYear = (year: number) => {
    currentYear.value = year
    isYearVisible.value = !isYearVisible.value
    generateYearsRange()
    }

    const formatToDate = (day: number, month: number, year: number): string => {
    const dayFormatted = day < 10 ? `0${day}` : `${day}`
    const monthFormatted = month < 10 ? `0${month}` : `${month}`
    const yearFormatted = `${year}`

    return `${dayFormatted}/${monthFormatted}/${yearFormatted}`
    }

    const changeMonth = (direction: number) => {
    currentMonth.value += direction
    if (currentMonth.value < 0) {
        currentMonth.value = 11
        changeYear(-1)
    }
    if (currentMonth.value > 11) {
        currentMonth.value = 0
        changeYear(1)
    }
    generateCalendar()
    }

    const changeYear = (direction: number) => {
    currentYear.value += direction
    }

    onMounted(() => {
    generateCalendar()
    })
</script>

<style scoped lang="scss">
.calendar-container {
position: absolute;
right: -8.1vw;
width: 18.3vw;
display: flex;
flex-direction: column;
z-index: 1000;
top: 3.2vw;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 25px rgba(237, 237, 250, 0.3);
transition: all 0.3s ease;
}

.calendar-triangle {
position: absolute;
top: -1.3vw;
left: 50%;
transform: translateX(-50%);
width: 1vw;
z-index: 1100;
}

.calendar {
width: 100%;
outline: 1px solid #e0e0e0;
border-radius: 5px;
background-color: var(--white-color);
}

.calendar-header {
background-color: var(--white-color);
display: flex;
flex-direction: column;
align-items: center;

.top-part {
    width: 100%;
    margin: 1.17vw 0 0.59vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
    color: var(--black-color);
    font-size: 1.17vw;
    font-weight: bold;
    line-height: 2.34vw;
    }

    img {
    width: 1.17vw;
    cursor: pointer;
    }
}
}

.days-of-week {
width: 100%;
display: grid;
grid-template-columns: repeat(7, 1.17vw);
gap: 1.17vw;
justify-content: center;
align-items: center;
margin-bottom: 0.59vw;

span {
    font-size: 0.7vw;
    font-weight: bold;
    line-height: 1.17vw;
    text-align: center;
    color: var(--DayofWeek-color);
}
}

.days {
display: grid;
grid-template-columns: repeat(7, 1.76vw);
gap: 0.59vw;
justify-content: center;
align-items: center;
margin: 0.59vw 0 0.59vw;

span {
    color: var(--black-color);
    font-size: 0.88vw;
    line-height: 1.76vw;
    text-align: center;
    cursor: pointer;

    &:hover {
    background-color: var(--DaySelect-Hover-color);
    border-radius: 50%;
    transition: 0.5s;
    }
}

span.today {
    color: var(--Today-color);
    font-weight: bold;
}

span.selected {
    background-color: var(--DaySelect-color);
    border-radius: 50%;
    color: var(--DaySelect-text);
    font-weight: bold;
}

span.not-current-month {
    color: var(--NotCurrentMonth-color);

    &:hover {
    color: var(--black-color);
    }
}
}

.months {
display: grid;
grid-template-columns: repeat(4, 3.66vw);
grid-template-rows: repeat(3, 2.34vw);
justify-content: center;
align-items: center;
margin: 0.59vw 0 1.17vw;

span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 0.88vw;
    color: black;
    cursor: pointer;

    &:hover {
    background-color: var(--MonthSelect-hover-color);
    }
}

span.currentmonth {
    color: var(--CurrentMonth-color);
    font-weight: bold;
}

span.selected {
    background-color: var(--MonthSelect-color);
    color: var(--white-color);
    font-weight: bold;
}
}

.today-button {
display: flex;
margin: 0 1.245vw 1.17vw 0;
justify-content: end;
font-size: 0.88vw;
font-weight: medium;
color: var(--Today-button-color);
cursor: pointer;
}

.today-button:hover {
    opacity: 0.7;
}

// input-wrapper
.input-wrapper {
width: 100%;
}

.input-padder {
width: 100%;
display: flex;
align-items: center;
}

.input-container {
display: flex;
position: relative;
width: 100%;
// height: auto;
outline: 0.07vw solid black;
border-radius: 3px;
cursor: text;
// font-size: 0.88vw;
color: black;

.input-field {
    min-width: 0;
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    color: black;
    background: transparent;
    padding: 10px;

    // &::placeholder {
    // color: red;
    // opacity: 1;
    // }
}

.input-icon {
    position: absolute;
    right: 0.6vw;
    width: 0.85vw;
    cursor: pointer;
}

.input-icon:hover {
    opacity: 0.7;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
}
</style>
