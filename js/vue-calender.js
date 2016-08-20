/*
 * @Author: baby
 * @Date:   2016-08-20 14:09:28
 * @Last Modified by:   baby
 * @Last Modified time: 2016-08-20 14:09:28
 */

'use strict';

new Vue({
    el: '#calendar',
    data: {
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: []
    },
    created: function() {
        this.initData(null)
    },
    methods: {
        initData(cur) {
            let date;
            if (cur) {
                date = new Date(cur)
            } else {
                date = new Date()
            }
            this.currentDay = date.getDate()
            this.currentYear = date.getFullYear()
            this.currentMonth = date.getMonth() + 1
            this.currentWeek = date.getDay() // 1...6,0

            if (this.currentWeek == 0) {
                this.currentWeek = 7
            }

            let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)

            console.log(`today: ${str}, ${this.currentWeek}`)

            this.days.length = 0

            // 今天是周日, 放在第一行第7个位置,前面6个
            for (let i = this.currentWeek - 1; i >= 0; i--) {
                let d = new Date(str)
                d.setDate(d.getDate() - i)

                console.log(`y1: ${d.getDate()}`)

                this.days.push(d)
            }
            for (let i = 1; i <= 35 - this.currentWeek; i++) {
                let d = new Date(str)
                d.setDate(d.getDate() + i)

                console.log(`y2: ${d.getDate()}`)

                this.days.push(d)
            }
        },

        // 选择日期
        pick(date) {
            alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
        },

        // 选择上一个月
        pickPrev(year, month) {
            // setDate(0) 上月最后一天
            // setDate(-1) 上月倒数第二天
            // setDate(dx) 参数 dx 为上个月最后一天的前后 dx 天
            let d = new Date(this.formatDate(year, month, 1))
            d.setDate(0)
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
        },

        // 选择下一个月
        pickNext(year, month) {
            let d = new Date(this.formatDate(year, month, 1))
            d.setDate(35)
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
        },

        // 选择年份
        pickYear(year, month) {
            alert(`${year}, ${month}`)
        },

        // 格式化时间
        formatDate(year, month, day) {
            let y = year
            let m = month
            if (m < 10) m = '0' + m
            let d = day
            if (d < 10) d = '0' + d
            return `${y}-${m}-${d}`
        }
    }
})