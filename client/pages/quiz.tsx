import fetch from 'isomorphic-unfetch';
import Button from 'material-ui/Button';
import withRedux from 'next-redux-wrapper';
import getConfig from 'next/config';
import * as React from 'react';
import { compose } from 'redux';
import Layout from '../components/Layout';
import Question from '../components/Question';
import { initStore } from '../store';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';
import styled from 'styled-components';

const Container = styled.div`
    flex: 1 0 100%;
    max-width: 1280px;
    width: 100%;
    margin: 5vh auto;
`;

const QuestionContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const { publicRuntimeConfig } = getConfig();

export interface QuizProps {
    questions: any;
}

export interface QuizState {
    showCorrectAnswers: boolean;
}

class Quiz extends React.Component<QuizProps, QuizState> {
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

            // We need 3 random multiple choice and 2 random true false
            let selected = questions.slice(0, 10);
            const randomTrueFalse = selected
                .sort(() => 0.5 - Math.random())
                .slice(0, 2);
            selected = questions.slice(10, 20);
            const randomMultipleChoice = selected
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            const mergedarray = [].concat(
                ...randomMultipleChoice,
                ...randomTrueFalse,
            );

            return { questions: mergedarray };
        } catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
        }
    }
    handleSubmitQuiz = async () => {
        this.setState({ showCorrectAnswers: true });
        // tslint:disable-next-line:no-console
        console.log('should have shown answers');
    };
    state = {
        showCorrectAnswers: false,
    };

    render() {
        const { questions } = this.props;
        const { showCorrectAnswers } = this.state;
        return (
            <Layout title="Quiz">
                <Container>
                    {questions.map((question, index) => (
                        <QuestionContainer key={question.guid}>
                            {index}.
                            <Question
                                question={question.question}
                                answers={question.answers}
                                showCorrectAnswers={showCorrectAnswers}
                            />
                        </QuestionContainer>
                    ))}
                    <Button
                        type="submit"
                        color="primary"
                        variant="raised"
                        onClick={this.handleSubmitQuiz}
                    >
                        Submit Quiz Here
                    </Button>
                </Container>
            </Layout>
        );
    }
}

export default compose<any>(
    withRoot(),
    withRedux(initStore),
    withAuth([PUBLIC]),
)(Quiz);
