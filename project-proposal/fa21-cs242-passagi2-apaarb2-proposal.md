# Sellify - Local marketplace, made simple.

Edward Passagi (passagi2) | Moderator: Apaar Bhatnagar (apaarb2)<br>
[Final Project Scoring Spreadsheet](https://docs.google.com/spreadsheets/d/18xnSFo8pKuuRWNJisH3NZ9PlIAUQobTHAluzzjQXqaA/edit?usp=sharing)

This is a mobile app that allows users in a local area to list items they want to sell for other community members to purchase.

## Abstract

Sellify allows its users to list detailed description about an item they want to sell. Sellify provides sellers to edit current listings & see completed listing history. Our user can also browse Sellify to see local listings. Potential buyers can message & propose meetup times for the transaction.

### Project Purpose

The purpose of this project is to bridge the gap for local secondhand transactions.

### Project Motivation

Sellify can leverage `React Native` to create native app compatible with `iOS`, `Android`, and `web`. This can increase the exposure of our app for users with different OS platform.

## Technical Specification

- Platform: Cross-platform app (React Native)
- Programming Languages: TypeScript, Backend embedded in the project
- Stylistic Conventions: Google TypeScript Style Guide
- SDK: Facebook SDK for React Native (possible for social login)
- IDE: Visual Studio Code, Android Studio (AVD Manager)
- Tools/Interfaces: Mobile devices (iOS, Android), Web Browser
- Target Audience: Tight-knit community
- Database: MongoDB, Neo4j (for users?)

## Functional Specification

### Features

- Login functionality & logic
- CRUD for Listings, see past orders history
- Messaging between sellers & buyers

### Rough Sketch Mockup

![image](/uploads/0b63c14d0959ee2d32ab1fb00b7fe1c9/image.png)

### Scope of the project

- Limitations include allowing online transactions (cash only, for now).
- Assumptions include users familiriaty with these common tech platforms.

## Brief Timeline

- Week 1: Ability to login & Basic UI views
- Week 2: CRUD per user for listings & history
- Week 3: Chat functionality between sellers & buyers

## Rubrics

### Week 1

| Category                             | Total Score Allocated | Detailed Rubrics                                                                                                                        |
| ------------------------------------ | :-------------------: | --------------------------------------------------------------------------------------------------------------------------------------- |
| Core logic for login & register & DB |           5           | 0: Didn't implement anything <br> 1: setup DB <br> 2: setup DAO <br> 3: can register user <br> 4: can login user <br> 5: flawless logic |
| Views                                |           5           | 0: Didn't implement anything <br> 3: login form <br> 4: register form <br> 5: responsive UI                                             |
| Code Style                           |           5           | 0: No effort in styling <br> 3: clear breakdown of MVC <br> 4: follows Google TS Style Guide <br> 5: efficient script & inline comments |
| Test DB & DAO                        |           5           | 0: Didn't implement tests <br> 2: simple tests <br> 4: more complex test <br> 5: tested edge cases                                      |
| Test Login                           |           5           | 0: Didn't implement tests <br> 2: simple tests <br> 4: more complex test <br> 5: tested edge cases                                      |

### Week 2

| Category                    | Total Score Allocated | Detailed Rubrics                                                                                                                                                              |
| --------------------------- | :-------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Figma Design                |           5           | 0: Didn't implement anything <br> 1: bare minimum screen design <br> 2: design for 2 screens <br> 3: design for 3 screens <br> 4: covers all screen <br> 5: attractive design |
| React Native Implementation |           5           | 0: Didn't implement anything <br> 3: basic listing view <br> 4: see past history <br> 5: attractive UI                                                                        |
| Code Style                  |           5           | 0: No effort in styling <br> 3: clear breakdown of MVC <br> 4: follows Google TS Style Guide <br> 5: efficient script & inline comments                                       |
| Static Data Test            |           5           | 0: Didn't implement tests <br> 2: non-comprehensive static data <br> 4: minimum static data <br> 5: proper render of static lists                                             |
| Manual Test                 |           5           | 0: Didn't implement tests <br> 2: simple tests <br> 4: tested some logic <br> 5: covers all areas                                                                             |

### Week 3

| Category                     | Total Score Allocated | Detailed Rubrics                                                                                                                                                         |
| ---------------------------- | :-------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Backend Support for Listings |           5           | 0: Didn't implement anything <br> 1: setup DB <br> 2: setup DAO <br> 3: can see listings <br> 4: can make new listings <br> 5: can change listing status                 |
| Authentication Integration   |           5           | 0: Didn't implement anything <br> 3: no clear login & homepage separation <br> 4: clear separation between auth and homepage <br> 5: integrate logged in user to listing |
| Code Style                   |           5           | 0: No effort in styling <br> 3: clear breakdown of MVC <br> 4: follows Google TS Style Guide <br> 5: efficient script & inline comments                                  |
| Postman API Test             |           5           | 0: Didn't implement tests <br> 2: simple tests <br> 4: more complex test <br> 5: tested edge cases                                                                       |
| Manual Test                  |           5           | 0: Didn't implement tests <br> 2: simple tests <br> 4: more complex test <br> 5: tested edge cases                                                                       |
