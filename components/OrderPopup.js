import s from './orderPopup.module.css'

export default function OrderPopup() {
    return (
            <div className={s.container}>
                <div className={s.wrap}>
                    <div className={s.inner}>
                        <div className={s.content}>
                            <div className={s.close}>
                                Close
                            </div>
                            <div className={s.title}>
                                Broker's consultation
                            </div>
                            <div className={s.subtitle}>
                                In Dubai, you can buy an apartment with a down payment of 20 thousand $. Calculate your profitability.
                            </div>
                            <div className={s.form__wrap}>
                                <div className={s.details}>
                                    <div className={s.list__title}>
                                        1. Enter your details.
                                    </div>
                                    <div className={s.privacy}>
                                        <div>
                                            <input type="checkbox"/>
                                        </div>
                                        <div className={s.checkbox__text}>
                                            I have read the <span className={s.link}>privacy policy</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.inputs__wrap}>
                                    <input name='name' className={s.input} required placeholder='Name'/>
                                    <input name='phone' className={s.input} required placeholder='Phone'/>
                                </div>
                                <div className={s.list__title}>
                                    2. Choose the cost.
                                </div>
                                <div className={s.subtitle}>
                                    The cost is indicated in thousands of
                                    <select className={s.select}>
                                        <option value="USD">USD</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    )
}