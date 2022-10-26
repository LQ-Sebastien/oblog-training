# Création d'une nouvelle révision de la DB avec sqitch

# 1. Création de variable temporaire pour les input utilisateur
INPUTNAMEFILE="USER NAME FILES INPUT"
INPUTNAMEREV="USER NAME FILES INPUT"

# 2. Demande à l'utilisateur le nom des fichiers et l'insert dans une variable temporaire
read -p "Nom des fichiers (ex: oclock_r2):" INPUTNAMEFILE

# 3. Demande à l'utilisateur la description de la révision et l'insert dans une variable temporaire
read -p "Nom de la révision (ex: Création des tables):" INPUTNAMEREV

# 4. Création de la révision grace au variables des entrées de l'utilisateur
sqitch add $INPUTNAMEFILE -n "$INPUTNAMEREV"