import { useForm } from "react-hook-form";
import { MinutesAmountInput, TaskInput ,FormContainer} from "./styles";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

export function NewCycleForm() {
    const newCycleFormValidationSchema = zod.object({
        task: zod.string().min(1, 'Informe a tarefa'),
        minutesAmount: zod.number().min(5).max(60)
    })

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput 
                id="task"
                list="task-suggesttions" 
                placeholder="Dê um nome para seu projeto" 
                disabled={!!activeCycle}
                {...register('task')}
            />

            <datalist id="task-suggesttions">
                <option value="Projeto 1" />
                <option value="Projeto 2" />
                <option value="Projeto 3" />
                <option value="Projeto 4" />
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput 
                type="number" 
                id="minutesAmount" 
                placeholder="00" 
                step={5}
                min={5}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}