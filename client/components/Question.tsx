import { FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import * as React from 'react';

export interface QuestionState {
    value: string;
    isCorrect: boolean;
}

export interface QuestionProps {
    answers?: any;
    question?: object;
    showCorrect: boolean;
}

class Question extends React.Component<QuestionProps, QuestionState> {
    // Initial state is the first answer of each question
    state = {
        value: this.props.answers[0].answer,
        isCorrect: false,
    };

    handleChange = event => {
        const answer = JSON.parse(event.target.value);
        this.setState({
            value: event.target.value,
            isCorrect: answer.isCorrect,
        });
    };

    render() {
        const { answers, question, showCorrect } = this.props;
        return (
            <FormControl component="fieldset" required>
                <FormLabel component="legend">{question}</FormLabel>
                {answers
                    .map(answer => (
                        <RadioGroup
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
                            {showCorrect ? (
                                // Currently selected answer
                                this.state.value === answer.answer ? (
                                    answer.isCorrect ? (
                                        <div>CORRECT</div>
                                    ) : (
                                        <div>WRONG</div>
                                    )
                                ) : // Not currently selected answer
                                answer.isCorrect ? (
                                    <div>ACTUAL ANSWER</div>
                                ) : (
                                    <div />
                                )
                            ) : (
                                <div />
                            )}
                        </RadioGroup>
                    ))
                    .reverse()}
            </FormControl>
        );
    }
}

export default Question;
