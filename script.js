const btn_standby = document.querySelector('.stand-by');
const control_panel = document.querySelector('.control-panel');
const timer = document.querySelector('.timer');
const btn_plus = document.querySelector('.btn-plus');
const btn_minus = document.querySelector('.btn-minus');
const btn_start_stop = document.querySelector('.btn-start-stop')
const btn_reset = document.querySelector('.btn-reset');
const sec = document.querySelector('.sec');
const min = document.querySelector('.min');

const form_min = document.getElementById('minutes-from-form');
const form_sec = document.getElementById('seconds-from-form');
const btn_insert = document.querySelector('.btn-insert');

let is_running = false;
let run = undefined     //для доступа к SetInterval в функции                                 //TimerStartStop

//==== Блок работы с клавишами, нажатие и удержание ===

btn_standby.onclick = () => {
    if (control_panel.style.display == '') {
        control_panel.style.display = 'flex';
    }
    else {
        control_panel.style.display = ''
    }
};

btn_plus.onclick = () => {
    if (!is_running) {secIncrement()}
};
btn_minus.onclick = () => {
    if (!is_running) {secDecrement(false)}
};
btn_plus.onmousedown = () => {
    if (!is_running) {
        const btn_hold = setInterval(secIncrement, 150);
        btn_plus.onmouseup = () => (clearInterval(btn_hold))
    }
};
btn_minus.onmousedown = () => {
    if (!is_running) {
        const btn_hold = setInterval(secDecrement, 150, false);
        btn_minus.onmouseup = () => (clearInterval(btn_hold))
    }
};
btn_start_stop.onclick = () => timerStartStop(is_running);
btn_reset.onclick = () => {
    min.innerHTML = '00';
    sec.innerHTML = '00';
    is_running = false;
    clearInterval(run);
};
btn_insert.onclick = () => {
    if (!is_running){
        min.innerHTML = formatNumber(
        validMinutes(
            validMinutes(form_min.value) + validSeconds(form_sec.value).min
            )
        );
        sec.innerHTML = formatNumber(validSeconds(form_sec.value).sec);
        form_min.value = '';
        form_sec.value = '';
    }
};

//======================================================

//================= Определение функций ================

function secIncrement(){
    if (sec.innerHTML < 59) {
        sec.innerHTML = formatNumber(++sec.innerHTML)
    }
    else {
        min.innerHTML = formatNumber(++min.innerHTML);
        sec.innerHTML = '00';
    }
};

function secDecrement(flag) {
    if (min.innerHTML != 0 || sec.innerHTML != 0) {
        if (sec.innerHTML == 0) {
            min.innerHTML = formatNumber(--min.innerHTML);
            sec.innerHTML = '59';
        }
        else {
            sec.innerHTML = formatNumber(--sec.innerHTML);
            if (min.innerHTML == 0 && sec.innerHTML == 0 && flag) {
                setTimeout(() => {
                    clearInterval(run);
                    is_running = false;
                    alert('Time is out!')
            }, 50)
        }
    }
    }
};

function timerStartStop(status) {
    if (status) {
        clearInterval(run);
        is_running = false;
    }
    else {
        run = setInterval(secDecrement, 1000, true);
        is_running = true;
    }
};

function formatNumber(number) {
    return ('00' + String(number)).slice(-2)
};

function validSeconds(seconds) {
    if (seconds < 0) {
        alert('Введите положительное число.');
        return time = {
        min: 0,
        sec: 0
    }}
    return time = {
        min: Math.floor(seconds / 60),
        sec: seconds % 60
    }
};

function validMinutes(minutes) {
    if (minutes < 0) {
        alert('Введите положительное число.');
        return 0}
    if (minutes <= 59) {return Number(minutes)}
    else {return 59}
}
