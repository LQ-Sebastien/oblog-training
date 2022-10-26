# 1. Création des variable d'environnements
export PGUSER=postgres          # Utilisateur pour créer la db et l'utilisateur
export PGHOST=localhost         # Adresse du serveur
export NEWDBNAME=oblog          # Nom de la nouvelle DB
export NEWDBUSER=oblog_admin    # Nom de l'utilisateur de la nouvelle DB
export ENGINE=pg                # Nom du client de base de donnée utilisé
export SQITCHNAME=oblog_sqitch  # Nom du projet sqitch
export SQITCHTOPDIR=database    # Dossier parent des fichiers de sqitch
export SQITCHADDNAME=oblog_v1   # Nom des fichiers de la premiere version de la DB
export SQITCHTARGET=db:pg://$NEWDBUSER@$PGHOST/$NEWDBNAME   # Addresse complete du serveur avec ID-HOST-DB

# 2. Création d'un utilisateur en DB
echo Creation du mot de passe du nouvel utilisateur $NEWDBUSER:
createuser -l -W $NEWDBUSER

# 3. Création d'une DB NEWDBNAME dont le propriétaire est NEWDBUSER
createdb -O $NEWDBUSER $NEWDBNAME


# 4. Initialisation de Sqitch
sqitch init $SQITCHNAME --engine pg --target $SQITCHTARGET --top-dir $SQITCHTOPDIR

# 5. Configuration de Sqitch
sqitch config deploy.verify true      # Force une vérification après chaque deploiement
sqitch config revert.no_prompt true   # Supprimer la confirmation des revert (Evite de taper "Yes")

# 6. Je deploie la V1
sqitch deploy