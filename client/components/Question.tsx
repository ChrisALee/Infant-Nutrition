import { FormControl, FormControlLabel, FormLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import * as React from 'react';

export interface QuestionState {
    value: string;
}

export interface QuestionProps {
    answers?: any;
    question?: object;
}

class Question extends React.Component<QuestionProps, QuestionState> {
    // Initial state is the first answer of each question
    state = {
        value: this.props.answers[0].answer,
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };
    render() {
        const { answers, question } = this.props;
        return (
            <FormControl component="fieldset" required>
                <FormLabel component="legend">{question}</FormLabel>
                <RadioGroup
                    aria-label="question"
                    name="question"
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    {answers.map(answer => (
                        <FormControlLabel
                            key={answer.guid}
                            value={answer.answer}
                            control={<Radio color="primary" />}
                            label={answer.answer}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        );
    }
}

export default Question;
