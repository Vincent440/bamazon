# Getting started 

1. Clone Project down with `git`

    ```shell
    git clone <project url>
    ```

1. Change into the project directory

    ```shell
    cd bamazon
    ```

1. Install the project dependencies

    ```shell
    npm i
    ```

1. Install the project dependencies

    ```shell
    npm i
    ```

1. Create the `.env` file and add required all environment variables

    ```shell
    touch .env
    ```

    Copy and Paste this block of code in, replacing with your username password and Database credentials.

    ```js
    DATABASE_HOST='localhost'
    DATABASE_PORT=3306
    DATABASE_USER='root'
    DATABASE_PASSWORD='Database-password'
    DATABASE_NAME='bamazon'
    ```

1. Create the Database using the `schema.sql` file. Populate the Database using the `seeds.sql` file

    Either using MySQL workbench run the script, or in the terminal using if you are connecting as the `root` user

    ```shell
    mysql -u root -p
    ```

    It will prompt for a password `Enter password: `, Enter your MySQL Database password here
    You should see succesful output upon login with the terminal showing `mysql>`

    Using the MySQL shell run the `schema.sql` script: 
    ```shell
    \. schema.sql
    ```

    Upon Succesful Database creation you should see:
    ```shell
    mysql> \. schema.sql
    
    Query OK, 0 rows affected, 1 warning (0.00 sec)

    Query OK, 1 row affected (0.01 sec)

    Database changed
    Query OK, 0 rows affected, 1 warning (0.06 sec)
    ```

    Now populate/seed the database with the `seeds.sql` file
    ```shell
    \. seeds.sql
    ```

    After successfully seeding the database you should see:
    ```shell
    mysql> \. seeds.sql
    Query OK, 12 rows affected (0.01 sec)
    Records: 12  Duplicates: 0  Warnings: 0
    ```
    Exit the MySQL Shell
    ```shell
    mysql> quit
    ```
    You should see a `Bye` message and successfully exit the MySQL Shell.


1. Run the application and begin developing


    To run `bamazonCustomer.js`
    ```shell
    npm run cust
    ```
    To run `bamazonManager.js`
    ```shell 
    npm run man

