import Message from '../models/message'

const Query = {
	async message(parent, args, {pubsub}, info){
		if(!args.query){
			const mes = await Message.find()
			return mes
		}
		
		const mes = await Message.find({"from":/[args.query]/})
		return mes
	}
}

export default Query