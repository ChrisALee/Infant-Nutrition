import * as React from 'react';
import Button from 'material-ui/Button';
import fetch from 'isomorphic-unfetch';


class Questions extends React.Component {
	static async getInitialProps(): Promise:<any>{
			const answers: any = await fetch
				('http://localhost:3001/api/quizzes/${quizGuid}/${questionGuid}',
				{
					method: 'GET',
					headers: {
						Accept: 'application/json'
					}
				});
				const result: any = await.json();
				return {result};
			}
			catch(err{
				console.log(err)
			}
	}

	render(){
		const {json} = this.props;
		return	(
		)
		
	}	
}