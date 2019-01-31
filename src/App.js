import React, { Component } from 'react'
import { Box, Button, Grommet, Heading, RangeSelector, Text, Stack, Select } from 'grommet'
import { CaretDown } from 'grommet-icons'

import AppBar from './AppBar'
import theme from './data/theme'
import locations from './data/locations'

class App extends Component {
  constructor(props) {
    super(props)

    function flatten(tree, level) {
      console.log('->', tree, level)
      let items = []

      for (let item of tree) {
        if (item.children) {
          items.concat(flatten(item.children, level+1))
        } else {
          items.push({
            name: item.name,
            level
          })
        }
      }
      return items
    }
    let flattenLocations = flatten(locations, 0)
console.log(flattenLocations)
    let state = {
      yearMin: 0,
      yearMax: 18,
      years: [],
      locations: flattenLocations
    }

    for (let i=state.yearMin; i<=state.yearMax; i+=2) state.years.push(i)
    state.selectedYears = [state.yearMin, state.yearMax]
    state.selectedLocation = state.locations[0]
    this.state = state
  }

  render() {
    const {yearMin, yearMax, years, selectedYears, locations, selectedLocation} = this.state

    return (
      <Grommet theme={theme}>
        <Box width='xlarge' margin={{ left: 'auto', right: 'auto' }}>
          <AppBar>
            <Heading level='3' margin={{ right: 'small' }}>Years:</Heading>
            <Stack>
              <Box direction="row" justify="between">
                {years.map(year => (
                  <Box key={year} pad="xsmall" border={false}>
                    <Text style={{fontFamily: 'monospace'}}>'{year < 10 ? '0'+year : year}</Text>
                  </Box>
                ))}
              </Box>
              <RangeSelector
                min={ yearMin }
                max={ yearMax }
                step={ 1 }
                values={ selectedYears }
                direction="horizontal"
                invert={false}
                size="full"
                round="xsmall"
                onChange={nextValues => this.setState({ selectedYears: nextValues })}
              />
            </Stack>
            <Heading level='3' margin={{ left: 'medium', right: 'small' }}>Location:</Heading>
            <Select
              options={locations}
              value={selectedLocation}
              labelKey='name'
              onChange={({ option }) => this.setState({ selectedLocation: option })}
            />
          </AppBar>
        </Box>
      </Grommet>
    )
  }
}

export default App
