/* eslint-disable array-callback-return */
import _moment from 'moment'
import { useEffect, useState } from 'react'

const todoList = [
  {
    id: 1,
    title: 'hello world',
    startDate: '2021.11.20',
    endDate: '2021.11.24',
  },
  {
    id: 2,
    title: 'hello world',
    startDate: '2021.11.20',
    endDate: '2021.11.21',
  },
  {
    id: 3,
    title: 'hello world',
    startDate: '2021.11.23',
    endDate: '2021.11.25',
  },
]

function Calendar() {
  const [moment, setMoment] = useState(_moment())
  const today = moment
  const firstWeek = today.clone().startOf('month').week()
  const lastWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.clone().endOf('month').week()

  useEffect(() => {
    console.debug(today.format('YYYY-MM-DD'))
    console.debug(today.clone().week())
    console.debug(firstWeek)
    console.debug(lastWeek)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderCalendarBody = () => {
    const result = []
    let week = firstWeek
    // ex) 45 ~ 49 째주면 45, 46, 47, 48, 49
    for (week; week <= lastWeek; week++) {
      result.push(
        <div className="flex w-full c-row" key={week}>
          {Array(7)
            .fill(0)
            // eslint-disable-next-line no-loop-func
            .map((_, index) => {
              const days = today
                .clone()
                .startOf('year')
                .week(week)
                .startOf('week')
                .add(index, 'day')

              return (
                <div
                  key={index}
                  className={'flex-1 border-t c-col min-h-[100px] mx-1'}
                >
                  <div className="w-full px-1">{days.format('DD')}</div>
                  <div className="flex flex-col justify-end">
                    {todoList.map((todo, index) => {
                      if (days.format('YYYY.MM.DD') === todo.startDate) {
                        return <div className="border" key={todo.id}>{todo.title}</div>
                      }
                    })}
                  </div>
                </div>
              )
            })}
        </div>,
      )
    }
    return result
  }

  const moveNextMonth = () => {
    setMoment(today.clone().add(1, 'month'))
  }

  const movePrevMonth = () => {
    setMoment(today.clone().subtract(1, 'month'))
  }

  return (
    <div
      id="calendar"
      className="w-[1000px] flex flex-col justify-center items-center rounded-sm bg-white p-10 pb-0"
    >
      <div className="flex items-center justify-between w-full mb-5">
        <div className="text-xl">{today.format('YYYY.MM')}</div>
        <div className="">
          <button
            className="px-2 transition-all hover:bg-gray-100"
            onClick={movePrevMonth}
          >
            {'<'}
          </button>
          <button className="px-2 transition-all hover:bg-gray-100">
            Today
          </button>
          <button
            className="px-2 transition-all hover:bg-gray-100"
            onClick={moveNextMonth}
          >
            {'>'}
          </button>
        </div>
      </div>
      <div id="c-header" className="flex w-full p-1">
        <div className="flex justify-center flex-1">SUN</div>
        <div className="flex justify-center flex-1">MON</div>
        <div className="flex justify-center flex-1">TUE</div>
        <div className="flex justify-center flex-1">WED</div>
        <div className="flex justify-center flex-1">THU</div>
        <div className="flex justify-center flex-1">FRI</div>
        <div className="flex justify-center flex-1">SAT</div>
      </div>
      <div id="c-body" className="w-full">
        {renderCalendarBody()}
      </div>
    </div>
  )
}

export default Calendar
