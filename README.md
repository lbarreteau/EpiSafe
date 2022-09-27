# EpiSafe

To complete

## Dependencies

### Create new access token
Creating a new access token is fundamental to use EpiSafe, it is used to retrieve all the information so that it can be processed

1 - Click on the link -> [Generate a new access token]("https://github.com/settings/tokens/new")

2 - Give it a name

3 - Click on the boxes "repo", "notifications", "user", "project"

4 - To finish click to "Generate token"

5 - Copy the token into configs/repo.json instead YOUR_TOKEN_HERE
```
{
  "global": {
    "nb_repository": 0,
    "username": "",
    "password": "YOUR_TOKEN_HERE"
  },
```

## Installation

1 - Clone EpiSafe repository

```bash
git@github.com:lbarreteau/EpiSafe.git
```

2 - Go to the repository

```bash
cd EpiSafe
```

3 - Install depedencies

```bash
npm run initialization
```

## Launch EpiSafe
```bash
npm run EpiSafe
```
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Authors
[@Luchooooo](https://www.github.com/lbarreteau) [@skydzn](https://www.github.com/skydzn)