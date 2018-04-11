exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', function(usersTable) {
            // Primary Key
            usersTable.increments();

            // Data
            usersTable.string('username', 50).notNullable().unique();
            usersTable.string('email', 250).notNullable().unique();
            usersTable.string('password', 128).notNullable();
            usersTable.specificType('scope', 'text[]').notNullable();
            usersTable.string('guid', 50).notNullable().unique();

            usersTable.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        })

        .createTable('profile', profileTable => {
            // Primary Key
            profileTable.increments();

            // Foreign Key
            profileTable.string('user_guid', 36).references('guid').inTable('users');

            // Data
            profileTable.string('name', 50).notNullable();
            profileTable.boolean('should_email').defaultTo(true).notNullable();
            profileTable.string('guid', 36).notNullable().unique();

            profileTable.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        })

        .createTable('babies', function(babiesTable) {
            // Primary Key
            babiesTable.increments();

            // Foreign Key
            babiesTable.string('user_guid', 36).references('guid').inTable('users');

            // Data
            babiesTable.string('name', 250).notNullable();
            babiesTable.date('date_of_birth').notNullable();
            babiesTable.string('guid', 36).notNullable().unique();

            babiesTable.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        })

        .createTable('quizzes', quizzesTable => {
            // Primary Key
            quizzesTable.increments();

            // Data
            quizzesTable.string('name', 250).notNullable();
            quizzesTable.integer('num_questions').notNullable();
            quizzesTable.string('guid', 36).notNullable().unique();

            quizzesTable.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        })

        .createTable('questions', questionsTable => {
            // Primary Key
            questionsTable.increments();

            // Foreign Key
            questionsTable.string('quiz_guid', 36).references('guid').inTable('quizzes');

            // Data
            questionsTable.string('question').notNullable();
            questionsTable.string('guid', 36).notNullable().unique();

            questionsTable.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        })

        .createTable('answers', answersTable => {
            // Primary Key
            answersTable.increments();

            // Foreign Key
            answersTable.string('question_guid', 36).references('guid').inTable('questions');

            // Data
            answersTable.string('answer').notNullable();
            answersTable.boolean('is_correct').notNullable();
            answersTable.string('guid', 36).notNullable().unique();

            answersTable.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        })

        .createTable('quiz_results', quizResultsTable => {
            // Primary Key
            quizResultsTable.increments();

            // Foreign Key
            quizResultsTable.string('quiz_guid', 36).references('guid').inTable('quizzes');
            quizResultsTable.string('user_guid', 36).references('guid').inTable('users');

            // Data
            quizResultsTable.integer('score').notNullable();
            quizResultsTable.string('guid', 36).notNullable().unique();

            quizResultsTable.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        })

        .createTable('content', contentTable => {
            // Primary Key
            contentTable.increments();

            // Data
            contentTable.string('content_type', 36);
            contentTable.string('outer_location', 36).notNullable();
            contentTable.string('inner_location', 36).notNullable();
            contentTable.string('text', 50000);
            contentTable.string('guid', 36).notNullable().unique();

            contentTable.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        })
};

exports.down = function(knex, Promise) {
    return knex.schema.raw('drop table content, babies, profile, answers, questions, quiz_results, quizzes, users cascade')
};