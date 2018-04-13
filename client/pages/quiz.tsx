import * as React from 'react';
import Button from 'material-ui/Button';
import fetch from 'isomorphic-unfetch';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';
import Nav from '../components/Nav';
import { initStore } from '../store';
import withRedux from 'next-redux-wrapper';
import Question from '../components/Question';
import getConfig from 'next/config';

import { compose } from 'redux';

export interface QuizProps {
    questions: any;
}

const { publicRuntimeConfig } = getConfig();

class Quiz extends React.Component<QuizProps, {}> {
    static async getInitialProps(): Promise<object> {
        try {
            const quizzes = await fetch(
                `${publicRuntimeConfig.API_HOST}/full-quizzes`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );

            // TODO: Come up with cleaner way of getting the questions
            const json: object[] = await quizzes.json();
            const generalQuiz: any = { ...json }[0];
            const questions = generalQuiz.questions;

            return { questions };
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
        }
    }

    render() {
        const { questions } = this.props;
        return (
            <div>
                <Nav />
                {questions.map(question => (
                    <div key={question.guid}>
                        <Question
                            question={question.question}
                            answers={question.answers}
                        />
                    </div>
                ))}
                <Button type="submit" color="primary">
                    Submit Quiz Here
                </Button>
            </div>
        );
    }
}

export default compose<any>(
    withRoot(),
    withRedux(initStore),
    withAuth([PUBLIC]),
)(Quiz);
