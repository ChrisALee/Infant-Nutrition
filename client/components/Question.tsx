import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import { FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import * as React from 'react';
import styled from 'styled-components';

const GreenDone = styled(Done)`
    && {
        color: green;
    }
`;

const RedClear = styled(Clear)`
    && {
        color: red;
    }
`;

const StyledRadioGroup = styled(RadioGroup)`
    && {
        display: flex;
        flex-direction: row;
    }
`;

export interface QuestionState {
    value: string;
    isCorrect: boolean;
}

export interface QuestionProps {
    answers?: any;
    question?: object;
    showCorrectAnswers: boolean;
}

class Question extends React.Component<QuestionProps, QuestionState> {
    // Initial state is the first answer of each question
    state = {
        value: null,
        isCorrect: false,
    };

    handleChange = event => {
        const answer = JSON.parse(event.target.value);
        this.setState({
            value: event.target.value,
            isCorrect: answer.isCorrect,
        });
    };
    // add above FormControlLabel <p>{answers.length - i}.</p>; currently numbers, needs to be abc
    render() {
        const { answers, question, showCorrectAnswers } = this.props;
        return (
            <FormControl component="fieldset" required>
                <FormLabel component="legend">{question}</FormLabel>
                {answers
                    .map((answer, i) => (
                        <StyledRadioGroup
                            aria-label="question"
                            name="question"
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel
                                key={answer.guid}
                                value={JSON.stringify(answer)}
                                control={<Radio color="primary" />}
                                label={answer.answer}
                            />
                            {showCorrectAnswers ? (
                                // Currently selected answer
                                this.state.value &&
                                JSON.parse(this.state.value).answer ===
                                    answer.answer ? (
                                    answer.isCorrect ? (
                                        <GreenDone />
                                    ) : (
                                        <RedClear />
                                    )
                                ) : // Not currently selected answer
                                answer.isCorrect ? (
                                    <GreenDone />
                                ) : null
                            ) : null}
                        </StyledRadioGroup>
                    ))
                    .reverse()}
            </FormControl>
        );
    }
}

export default Question;
