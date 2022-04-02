import Message from '../models/message'

const Mutation = {
	createMessage(parent, args, {pubsub}, info){
		const user = JSON.parse(JSON.stringify(args.data))
		
		Message.create(user)
		
		pubsub.publish('message', {
			message:{
				mutation: 'CREATED',
				data: user
			}
		})
		
		return user
	},
	
	async deleteMessage(parent, args, {pubsub}, info){
		const FindMes = await Message.findOne({"body": [args.body]})
		
		await Message.deleteMany({"body": [args.body]})
		
		pubsub.publish('message', {
			message:{
				mutation: 'DELETED',
				data: {
					from: FindMes.from,
					to:FindMes.to,
					body: FindMes.body   
					  }
			}
		})
		
		return FindMes
	}
}

export default Mutation