# Monday to Jira migration script 
This is a relatively simple script with its sole purpose to read and map all pulses from [Monday.com](https://monday.com) and create a JIRA CSV file with the corresponding format.

## How to add mapper
1. Go to `mappers` folder
2. Implement the mapping function
3. Use it in mapping flow

## Migration check list
- [ ] Column `Type` should exist and each pulse must have a value
- [ ] Column `Epic` should have an assigned value, default epic `Generic`
- [ ] Pulses should have Estimations, default is `1`
