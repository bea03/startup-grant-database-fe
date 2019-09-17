import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";

import { connect } from "react-redux";
import { filterGrants } from "../actions/index";

const Filters = ({ filterGrants }) => {
  const [filters, setFilters] = useState({
    region: [],
    amount: [],
    area_focus: [],
    minority: []
  });

  //Makes sure that the current state is being sent to the action creator
  useEffect(() => {
    filterGrants(filters);
  }, [filters])

  const grantFilters = {
    color: "primary",
    region: ["Global", "North America", "Europe", "South America", "Africa"],
    amount: ["Under $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000+"],
    area_focus: ["Business", "Technology", "Science", "Creative"],
    minority: ["Women", "African American", "Hispanic", "Other"]
  };

  const handleChanges = (type, value) => {

    if(filters[type].includes(value)){
        console.log("Its there")
        setFilters({
            ...filters,
            [type]: filters[type].filter(val => val !== value)
        })
    } else {
        console.log("it's not here")
        setFilters({
            ...filters,
            [type]:  [...filters[type], value]
        })
    }

    //Pass object of user filters to the action creator
  };
  console.log("render", filters);
  return (
    <div>
      <h2>Filter Grants By:</h2>

      <FormGroup >
        <FormControl component="fieldset">
          <FormLabel component="legend">Grant Amount</FormLabel>
          {grantFilters.amount.map(name => {
            return (
              <FormControlLabel
                control={<Checkbox value={name} color={grantFilters.color} onClick={() => handleChanges("amount", name)}/>}
                key={name}
                label={name}
              />
            );
          })}
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Area Focus</FormLabel>
          {grantFilters.area_focus.map(name => {
            return (
              <FormControlLabel
                control={<Checkbox value={name} color={grantFilters.color} onClick={() => handleChanges("area_focus", name)}/>}
                key={name}
                label={name}
              />
            );
          })}
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Region</FormLabel>
          {grantFilters.region.map(name => {
            return (
              <FormControlLabel
                control={<Checkbox value={name} color={grantFilters.color} onClick={() => handleChanges("region", name)}/>}
                key={name}
                label={name}
              />
            );
          })}
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">Minority</FormLabel>
          {grantFilters.minority.map(name => {
            return (
              <FormControlLabel
                control={<Checkbox value={name} color={grantFilters.color} onClick={() => handleChanges("minority", name)}/>}
                key={name}
                label={name}
              />
            );
          })}
        </FormControl>
      </FormGroup>
    </div>
  );
};

export default connect(
  null,
  { filterGrants }
)(Filters);