exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', function(usersTable) {
            // Primary Key
            usersTable.increments();

            // Data
            usersTable.string('name', 50).notNullable();
            usersTable
                .string('username', 50)
                .notNullable()
                .unique();
            usersTable
                .string('email', 250)
                .notNullable()
                .unique();
            usersTable.string('password', 128).notNullable();
            usersTable
                .string('guid', 50)
                .notNullable()
                .unique();

            usersTable
                .timestamp('created_at')
                .notNullable()
                .defaultTo(knex.raw('now()'));
        })

        .createTable('user_settings', userSettingsTable => {
            // Primary Key
            userSettingsTable.increments();

            // Foreign Key
            userSettingsTable
                .string('owner', 36)
                .references('guid')
                .inTable('users');

            // Data
            userSettingsTable
                .boolean('should_email')
                .defaultTo(true)
                .notNullable();
            userSettingsTable
                .string('guid', 36)
                .notNullable()
                .unique();

            userSettingsTable
                .timestamp('created_at')
                .notNullable()
                .defaultTo(knex.raw('now()'));
        })

        .createTable('babies', function(babiesTable) {
            // Primary Key
            babiesTable.increments();

            // Foreign Key
            babiesTable
                .string('owner', 36)
                .references('guid')
                .inTable('users');

            // Data
            babiesTable.string('name', 250).notNullable();
            babiesTable.integer('age').notNullable();
            babiesTable
                .string('guid', 36)
                .notNullable()
                .unique();

            babiesTable
                .timestamp('created_at')
                .notNullable()
                .defaultTo(knex.raw('now()'));
        })

        .createTable('quizzes', quizzesTable => {
            // Primary Key
            quizzesTable.increments();

            // Data
            quizzesTable.string('name', 250).notNullable();
            quizzesTable.integer('num_questions').notNullable();
            quizzesTable
                .string('guid', 36)
                .notNullable()
                .unique();

            quizzesTable
                .timestamp('created_at')
                .notNullable()
                .defaultTo(knex.raw('now()'));
        })

        .createTable('questions', questionsTable => {
            // Primary Key
            questionsTable.increments();

            // Foreign Key
            questionsTable
                .string('owner', 36)
                .references('guid')
                .inTable('quizzes');

            // Data
            questionsTable.string('question').notNullable();
            questionsTable
                .string('guid', 36)
                .notNullable()
                .unique();

            questionsTable
                .timestamp('created_at')
                .notNullable()
                .defaultTo(knex.raw('now()'));
        })

        .createTable('answers', answersTable => {
            // Primary Key
            answersTable.increments();

            // Foreign Key
            answersTable
                .string('owner', 36)
                .references('guid')
                .inTable('questions');

            // Data
            answersTable.string('answer').notNullable();
            answersTable.boolean('is_correct').notNullable();
            answersTable
                .string('guid', 36)
                .notNullable()
                .unique();

            answersTable
                .timestamp('created_at')
                .notNullable()
                .defaultTo(knex.raw('now()'));
        })

        .createTable('quiz_results', quizResultsTable => {
            // Primary Key
            quizResultsTable.increments();

            // Foreign Key
            quizResultsTable
                .string('owner', 36)
                .references('guid')
                .inTable('quizzes');
            quizResultsTable
                .string('owner', 36)
                .references('guid')
                .inTable('users');

            // Data
            quizResultsTable.integer('score').notNullable();
            quizResultsTable
                .string('guid', 36)
                .notNullable()
                .unique();

            quizResultsTable
                .timestamp('created_at')
                .notNullable()
                .defaultTo(knex.raw('now()'));
        });
};

exports.down = function(knex, Promise) {
    // We use `...ifExists` because we're not sure if the table's there. Honestly, this is just a safety measure.
    return knex.schema
        .dropTableIfExists('babies')
        .dropTableIfExists('profile_settings')
        .dropTableIfExists('answers')
        .dropTableIfExists('questions')
        .dropTableIfExists('quiz_results')
        .dropTableIfExists('quizzes')
        .dropTableIfExists('users');
};
