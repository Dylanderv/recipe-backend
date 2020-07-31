# recipe-backend

Todo:
- [ ] Nutriscore calculation????
- [ ] Get food nutritional intake
- [ ] Get recipe nutritional intake
- [ ] Create account
- [ ] Store recipe
- [ ] Select recipe and get a shopping list

First step:
- User(mail:unique, password, name, personal informations)
- Recipe(name?, url:unique)
- ShoppingList(name, listRecipe, user, created, updated)
- RecipeLiked(Recipe, User, date, created)

Second step:
- NutritionalInfo(aliment:unique, info)
- Aliment(name:unique)


## DB setup

docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres

export DATABASE_HOST=localhost
export DATABASE_USER=postgres
export DATABASE_DB=postgres
export DATABASE_PASSWORD=mysecretpassword
