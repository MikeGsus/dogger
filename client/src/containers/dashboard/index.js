import React, { useState } from 'react'
import { format } from 'date-fns'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css';
import { FabButton } from '../../components/fabButton';
import { useDogs } from '../../utils/hooks/useDogs';
import { Selector } from '../../components/selector';
import { Button } from '../../components';
import { useWalkers } from '../../utils/hooks/useWalkers';
import { DateTiles, HourTiles } from '../../components/dateTiles';
import { transformScheduleWalk, transformScheduleWalkForWalker, useSchedule } from '../../utils/hooks/useSchedule';
import { MyDogs } from '../../components/myDogs';
import { ScheduleWalks } from '../../components/scheduleWalks';
import { Walkers } from '../../components/walkers';
import { Container } from './styled';
import { useSelector } from 'react-redux';

const Dashboard = props => {
  const today = format(new Date(), 'EEEE')
  const userState = useSelector(state => state.users)
  const dogsState = useDogs()
  const walkerState = useWalkers()
  const scheduleState = useSchedule()
  const [visible, setVisible] = useState(false)
  const [dog, setDog] = useState(null)
  const [walker, setWalker] = useState(null)
  const [scheduleDay, setScheduleDay] = useState(today)
  const [schedule, setSchedule] = useState()
  return (
    <Container>
      {
        userState?.user?.owner ? (
          <>
            <ScheduleWalks
              columns={['dog', 'walker', 'schedule']}
              scheduleState={scheduleState}
              transform={transformScheduleWalk}
            />
            <MyDogs dogState={dogsState} />
            <Walkers walkerState={walkerState} />
            <FabButton onPress={() => setVisible(true)}>
              Schedule a Walker
            </FabButton>
            <Rodal
              animation='slideUp'
              width={800}
              height={500}
              visible={visible}
              onClose={() => {
                setVisible(false)
                setDog(null)
                setWalker(null)
                setScheduleDay(today)
                setSchedule(null)
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div style={{ flex: 1 }}>
                  <Selector
                    label='Select a Dog'
                    error=''
                    name='dog'
                    onSelect={(e) => {
                      setDog(e.target.value)
                    }}
                    value={dog}
                    data={dogsState.dogs}
                    field='name'
                    placeholder='Pick a Dog to schedule a Walker'
                  />
                  <Selector
                    label='Select a Walker'
                    error=''
                    name='walker'
                    onSelect={(e) => {
                      setWalker(e.target.value)
                    }}
                    value={walker}
                    data={walkerState.walkers}
                    field='walker.name'
                    placeholder='Pick a Walker to see his schedules'
                  />
                  <DateTiles
                    value={scheduleDay}
                    onSelectDay={setScheduleDay}
                    walker={walkerState.walkers.filter(w => w.id === parseInt(walker))}
                  />
                  <HourTiles
                    value={schedule}
                    onSelectHour={setSchedule}
                    scheduleDay={scheduleDay}
                    walker={walkerState.walkers.filter(w => w.id === parseInt(walker))}
                  />
                </div>
                <div>
                  <Button
                    disabled={!dog || !walker || !scheduleDay || !schedule}
                    onPress={() => {
                      scheduleState.createScheduleWalk({
                        schedule: parseInt(schedule),
                        dog: parseInt(dog),
                        walker: parseInt(walker)
                      }, () => setVisible(false))
                    }}
                    style={{ width: '100%' }}
                    wide
                  >
                    SCHEDULE WALKER
                  </Button>
                </div>
              </div>
            </Rodal>
          </>
        ) : (
          <>
            <ScheduleWalks
              columns={['dog', 'owner', 'schedule']}
              transform={transformScheduleWalkForWalker}
              title='My Schedule Walks'
              scheduleState={scheduleState}
            />
          </>
        )
      }
    </Container>
  )
}

export default Dashboard
