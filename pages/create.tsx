import { Button, Input, Typography } from '@material-tailwind/react'
import { useRouter } from 'next/router'
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useAccount,useContract, useProvider,useSigner } from 'wagmi'
import { ethers } from "ethers";
import abi from "../abi/contract.json"
import { toast } from 'react-hot-toast';
import Loading from '../components/Loading';

const create = () => {
  const {push} = useRouter()
  const [state, setState] = useState({
    name: '',
    amount: ''
  })
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner()
   console.log(signer)
  console.log('provider => ', provider)
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setState({...state, [e.target.name]: e.target.value})
  }
    const {isConnected, address} = useAccount()
    const contract = useContract({
      address: '0x71855Af0052228dF68962a019E54131b865529De',
      abi: abi,
      signerOrProvider: signer
    })
    console.log(contract)
    const [loading, setLoading] = useState(false);
    const onSubmit = async (e: MouseEvent<HTMLElement>) => {
      setLoading(true)
      try {
        // const amount = {value: ethers.utils.parseEther(state.amount).toString()}
        const amount = {value: ethers.utils.parseUnits(state.amount, 'ether').toString()}
        const transaction = await contract?.fund(state.name, amount)
      await transaction.wait();
     
      toast('Transaction made successfull!',
  {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }

);
push('/')
      setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    
    useEffect(() => {
      if(!isConnected) {
        push('/')
      }
    }, [])
  return (
    <div className='max-w-screen-xl mx-auto my-10'>
        <div className='flex justify-center'>
            <div className='w-full md:w-5/12'>
                <div className='bg-white p-5 rounded shadow'>
                <Typography variant="h4" color="blue-gray" className="capitalize mb-4">
        create fund
      </Typography>
      <Input size="lg" label="Your Name" className='block' name="name" value={state.name} onChange={onChange} required={true} />
      <Input size="lg" type='text' label="Eth Amount" className='mt-6 block' name="amount" value={state.amount} onChange={onChange} required={true} />
      {loading ? <Loading mt='mt-4' /> : <Button color="green" className='mt-6' onClick={onSubmit}>Donate</Button>}

                </div>
            </div>
        </div>
    </div>
  )
}

export default create