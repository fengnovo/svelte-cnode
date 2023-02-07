import type { Topic } from '../types/topic';

export async function useFetchTopics(page: number, tab: string) {
    try {
        const response = await fetch(`https://cnodejs.org/api/v1/topics?page=${page}&tab=${tab}&limit=10`);
        const result = await response.json();
        return { data: result };
    } catch (err) {
        return err;
    }
}

export async function useFetchTopicDetail(id: string) {
    try {
        const response = await fetch(`https://cnodejs.org/api/v1/topic/${id}`);
        const result = await response.json();
        return { data: result };
    } catch (err) {
        return { data: { data: [], success: false } };
    }
}

export async function useFetchUser(id: string) {
    try {
        const response = await fetch(`https://cnodejs.org/api/v1/user/${id}`);
        const result = await response.json();
        return { data: result };
    } catch (err) {
        return { data: { data: [], success: false } };
    }
}
export async function useFetchAccesstoken(accesstoken: string) {
    try {
        const response = await fetch(`https://cnodejs.org/api/v1/accesstoken`, {
            method: 'post',
            body: JSON.stringify({ accesstoken }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json();
        return { data: result };
    } catch (err) {
        return { data: { data: [], success: false } };
    }
}

export async function useFetchPost(data: any) {
    try {
        const response = await fetch(`https://cnodejs.org/api/v1/topics`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json();
        return { data: result };
    } catch (err) {
        return { data: { data: [], success: false } };
    }
}