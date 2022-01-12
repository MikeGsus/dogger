import React, { useState } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css';
import { DataTable } from '../../components/table';
import { FabButton } from '../../components/fabButton';
import { transformDogs, useDogs } from '../../utils/hooks/useDogs';
import { Selector } from '../../components/selector';
import { Button } from '../../components';
import { transformWalker, useWalkers } from '../../utils/hooks/useWalkers';
import { DateTiles, HourTiles } from '../../components/dateTiles';
import { transformScheduleWalk, useSchedule } from '../../utils/hooks/useSchedule';

const Dashboard = props => {
  const today = format(new Date(), 'EEEE')
  const dogsState = useDogs()
  const walkerState = useWalkers()
  const scheduleState = useSchedule() 
  console.log('scheduleState:', scheduleState)
  const [visible, setVisible] = useState(false)
  const [dog, setDog] = useState(null)
  const [walker, setWalker] = useState(null)
  const [scheduleDay, setScheduleDay] = useState(today)
  const [schedule, setSchedule] = useState()
  return (
    <div
      style={{
        flex: 1,
        padding: 30,
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <Title>Schedule Walks</Title>
        </div>
        <div style={{ maxHeight: 300, overflow: 'scroll' }}>
          <DataTable
            columns={['dog', 'walker', 'schedule']}
            data={scheduleState.scheduleWalks.map(transformScheduleWalk)}
            emptyMessage='WALKS NOT FOUND'
          />
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <Title>My Dogs</Title>
        </div>
        <div style={{ maxHeight: 300, overflow: 'scroll' }}>
          <DataTable
            columns={['photo', 'name', 'breed', 'age']}
            data={dogsState.dogs.map(transformDogs)}
            emptyMessage='DOGS NOT FOUND'
          />
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <Title>Walkers</Title>
        </div>
        <div style={{ maxHeight: 300, overflow: 'scroll' }}>
          <DataTable
            columns={['name', 'lastName', 'email', 'phone']}
            data={walkerState.walkers.map(transformWalker)}
            emptyMessage='WALKERS NOT FOUND'
          />
        </div>
      </div>
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
    </div>
  )
}

export default Dashboard

const Title = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
`
